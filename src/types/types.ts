export default DoFetcher;

type DoFetcher = {
    'app-states'?: string[], 
    'host'?: string,
    'groups'?: Group | null,
    'get'?: URL[] | null,
    'post'?: URL[] | null,
    'put'?: URL[] | null,
    'delete'?: URL[] | null,
};

type URL = {
    "path": string,
    "status": string | null,
    "headers": object | null,
};

type Group = {
    'name': string | null,
    'prefix': string | null,
    'get': URL[] | null,
    'post': URL[] | null,
    'put': URL[] | null,
    'delete': URL[] | null,
    'subgroup' : Group[] | null,
};