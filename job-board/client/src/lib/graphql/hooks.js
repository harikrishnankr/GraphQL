import { useMutation, useQuery } from "@apollo/client";
import { CREATE_JOB_MUTATION, GET_COMPANY_QUERY, GET_JOBS_QUERY, GET_JOB_QUERY } from "./queries";

export function useCompany(id) {
    const { error, loading, data } = useQuery(GET_COMPANY_QUERY, {
      variables: {
        id
      }
    });
  
    return { company: data?.company, loading, error: Boolean(error) }
};

export function useJob(id) {
    const { error, loading, data } = useQuery(GET_JOB_QUERY, {
      variables: {
        id
      }
    });
  
    return { job: data?.job, loading, error: Boolean(error) }
};

export function useJobs(limit, offset) {
    const { error, loading, data } = useQuery(GET_JOBS_QUERY, {
      variables: { limit, offset },
      fetchPolicy: "network-only"
    });
  
    return { jobs: data?.jobs, loading, error: Boolean(error) }
};

export function useCreateJob() {
    const [mutate, { loading }] = useMutation(CREATE_JOB_MUTATION);

    const createJob = async (title, description) => {
        const { data: { job }} = await mutate({
            variables: {
              input: {title, description}
            },
            update: (cache, { data }) => {
                cache.writeQuery({
                    query: GET_JOB_QUERY,
                    variables: { id: data.job.id },
                    data
                })
            }
        });

        return job;
    }

    return {
        loading,
        createJob
    }
}
