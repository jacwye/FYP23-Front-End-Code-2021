import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BatchHttpLink } from "apollo-link-batch-http";
import urljoin from "url-join";
import { resolvers } from "../../common/graphql/localResolvers";
import { typeDefs } from "../../common/graphql/localSchema";
import introspectionResult from "../../types/schema.json";
import { firebaseApp } from "../firebase";

/**
 * Sets up the necessary objects for configuring the Apollo Client.
 * Apollo Client is the library used to communicate with our backend
 * GraphQl server. All of the queries and mutation go through this
 * client.
 */

function generateInMemoryCache() {
    const possibleTypes = {};

    introspectionResult.__schema.types.forEach((supertype) => {
        if (supertype.possibleTypes) {
            possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
        }
    });

    return new InMemoryCache({
        possibleTypes: possibleTypes,
    });
}

const cache = generateInMemoryCache();

const authLink = setContext(async (req, { headers }) => {
    const currentUser = firebaseApp.auth().currentUser;
    if (!currentUser) {
        return;
    }

    const token = await currentUser.getIdToken();

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const apolloHttpLink = new BatchHttpLink({
    uri: urljoin(process.env.REACT_APP_ENDPOINT_URL || "", "graph"),
});

export const refreshApolloAuthentication = () => {
    apolloClient.link = ApolloLink.from([authLink, (apolloHttpLink as unknown) as ApolloLink]);
};

export const apolloClient = new ApolloClient<NormalizedCacheObject>({
    cache,
    link: ApolloLink.from([authLink, (apolloHttpLink as unknown) as ApolloLink]),
    typeDefs,
    resolvers,
    connectToDevTools: true,
});
