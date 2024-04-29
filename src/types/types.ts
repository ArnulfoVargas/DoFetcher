type Fetcher = {
    'app-states'?: string[], 
    'host'?: string,
    'groups'?: Group[],
    'get'?: URL[],
    'post'?: URL[],
    'put'?: URL[],
    'delete'?: URL[],
};

type Url = {
    "path": string,
    "status": string | undefined,
    "headers": object | undefined,
};

type Group = {
    'app-state'?:string,
    'name': string | undefined,
    'prefix': string | undefined,
    'get': URL[] | undefined,
    'post': URL[] | undefined,
    'put': URL[] | undefined,
    'delete': URL[] | undefined,
    'subgroup': Group[] | undefined,
};

export type DoFetcher = Fetcher;
export type URL = Url;
export type UrlGroup = Group;