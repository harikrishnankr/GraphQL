import { ApolloClient, ApolloLink, concat, createHttpLink, gql, InMemoryCache } from "@apollo/client";
import { getAccessToken } from "../auth";

const httpLink = createHttpLink({ uri: "http://localhost:9000/graphql" });

const customLink = new ApolloLink((operation, forward) => {
    const accessToken = getAccessToken();
    if (accessToken) {
        operation.setContext({
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
    }

    return forward(operation);
});

export const apolloClient = new ApolloClient({
    link: concat(customLink, httpLink),
    cache: new InMemoryCache()
});

const jobDetailFragment = gql`
    fragment JobDetail on Job {
        id
        date
        title,
        company {
            id
            name
        },
        description
    }
`;

export const GET_JOBS_QUERY = gql`
    query GetJobs($limit: Int, $offset: Int) {
        jobs(limit: $limit, offset: $offset) {
            items {
                ...JobDetail
            }
            totalCount
        }
    }
    ${jobDetailFragment}
`;

export const GET_JOB_QUERY = gql`
    query GetJob($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
    }
    ${jobDetailFragment}
`;

export const GET_COMPANY_QUERY = gql`
    query GetCompany($id: ID!) {
        company(id: $id) {
            id
            name
            description
            jobs {
                id
                title
                date
            }
        }
    }
`;

export const CREATE_JOB_MUTATION = gql`
    mutation CreateJob($input: CreateJobInput!) {
        job: createJob(input: $input) {
            ...JobDetail
        }
    }
    ${jobDetailFragment}
`;
