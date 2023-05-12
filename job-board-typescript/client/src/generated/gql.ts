/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment JobDetail on Job {\n    id\n    date\n    title\n    company {\n      id\n      name\n    }\n    description\n  }\n": types.JobDetailFragmentDoc,
    "\n  query CompanyById($id: ID!) {\n    company(id: $id) {\n      id\n      name\n      description\n      jobs {\n        id\n        date\n        title\n      }\n    }\n  }\n": types.CompanyByIdDocument,
    "\n  query JobById($id: ID!) {\n    job(id: $id) {\n      ...JobDetail\n    }\n  }\n": types.JobByIdDocument,
    "\n  query Jobs($limit: Int, $offset: Int) {\n    jobs(limit: $limit, offset: $offset) {\n      items {\n        id\n        date\n        title\n        company {\n          id\n          name\n        }\n      }\n      totalCount\n    }\n  }\n": types.JobsDocument,
    "\n  mutation CreateJob($input: CreateJobInput!) {\n    job: createJob(input: $input) {\n      ...JobDetail\n    }\n  }\n": types.CreateJobDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment JobDetail on Job {\n    id\n    date\n    title\n    company {\n      id\n      name\n    }\n    description\n  }\n"): (typeof documents)["\n  fragment JobDetail on Job {\n    id\n    date\n    title\n    company {\n      id\n      name\n    }\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CompanyById($id: ID!) {\n    company(id: $id) {\n      id\n      name\n      description\n      jobs {\n        id\n        date\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query CompanyById($id: ID!) {\n    company(id: $id) {\n      id\n      name\n      description\n      jobs {\n        id\n        date\n        title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query JobById($id: ID!) {\n    job(id: $id) {\n      ...JobDetail\n    }\n  }\n"): (typeof documents)["\n  query JobById($id: ID!) {\n    job(id: $id) {\n      ...JobDetail\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Jobs($limit: Int, $offset: Int) {\n    jobs(limit: $limit, offset: $offset) {\n      items {\n        id\n        date\n        title\n        company {\n          id\n          name\n        }\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query Jobs($limit: Int, $offset: Int) {\n    jobs(limit: $limit, offset: $offset) {\n      items {\n        id\n        date\n        title\n        company {\n          id\n          name\n        }\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateJob($input: CreateJobInput!) {\n    job: createJob(input: $input) {\n      ...JobDetail\n    }\n  }\n"): (typeof documents)["\n  mutation CreateJob($input: CreateJobInput!) {\n    job: createJob(input: $input) {\n      ...JobDetail\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;