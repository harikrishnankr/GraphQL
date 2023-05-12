import { GraphQLError } from "graphql";
import { getCompany } from "./db/companies.js";
import { countJobs, createJob, deleteJob, getJob, getJobs, getJobsByCompany, updateJob } from "./db/jobs.js";

function toIsoDate(date) {
    return date.slice(0, "yyyy-mm-dd".length);
}

function notFoundError(message) {
    return new GraphQLError(message, {
        extensions: { code: "NOT_FOUND" }
    });
}

function unAuthorizedError(message) {
    return new GraphQLError(message, {
        extensions: { code: "UNAUTHORIZED" }
    });
}

export const resolvers = {
    Query: {
        jobs: async (_, { limit, offset }) => {
            const jobs = await getJobs(limit, offset);
            const totalCount = await countJobs();

            return {
                items: jobs,
                totalCount
            };
        },
        job: async (_, args) => {
            const job = await getJob(args.id);
            if (!job) {
                throw notFoundError("No job  found with id " + id);
            }
            return job;
        },
        company: async (_, args) => {
            const company = await getCompany(args.id);
            if (!company) {
                throw notFoundError("No company  found with id " + id);
            }
            return company;
        }
    },
    Job: {
        company: async (job, _args, { companyLoader }) => {
            const company = await companyLoader.load(job.companyId);
            return company;
        },
        date: (job) => toIsoDate(job.createdAt)
    },
    Company: {
        jobs: (company) => getJobsByCompany(company.id)
    },
    Mutation: {
        createJob: (_, { input: { title, description }  }, contextValue) => {
            if (!contextValue.user) {
                throw unAuthorizedError("Missing authentication");
            }
            const companyId = contextValue.user.companyId;
            return createJob({ title, description, companyId });
        },
        deleteJob: async (_, { id }, contextValue) => {
            const { user } = contextValue;
            if (!user) {
                throw unAuthorizedError("Missing authentication");
            }

            const job = await deleteJob(id, user.companyId);
            if (!job) {
                throw notFoundError("No job  found with id " + id);
            }

            return job;
        },
        updateJob: async (_, { input: { id, title, description } }) => {
            const { user } = contextValue;
            if (!user) {
                throw unAuthorizedError("Missing authentication");
            }

            const job = updateJob({ id, title, description, companyId: user.companyId });
            if (!job) {
                throw notFoundError("No job found with id " + id);
            }

            return job;
        }
    }
}