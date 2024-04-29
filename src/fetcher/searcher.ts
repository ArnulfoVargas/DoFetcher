import { DoFetcher, UrlGroup } from "../types/types";

export const Explore = (fetcher : DoFetcher, currentAppState : string) => {
    const base = fetcher.host !== undefined  && fetcher.host !== "" 
        ? fetcher.host 
        : "http://localhost";

    fetcher.get?.forEach(url => {
        console.log(base + url);
    });

    fetcher.post?.forEach(url => {
        console.log(base + url);
    });

    fetcher.put?.forEach(url => {
        console.log(base + url);
    });

    fetcher.delete?.forEach(url => {
        console.log(base + url);
    });

    SearchInGroups(fetcher.groups, base, currentAppState);
};

const SearchInGroups = (urlGroup : UrlGroup[] | undefined, base : string, currentAppState : string) => {
    if (urlGroup === undefined) {return;}

    urlGroup.forEach(group => {
        const groupBase = base + group.prefix;

        if (currentAppState !== "Any" && group["app-state"] !== currentAppState) { return; };

        group.get?.forEach(url => {
            console.log(groupBase + url);
        });

        group.post?.forEach(url => {
            console.log(groupBase + url);
        });

        group.put?.forEach(url => {
            console.log(groupBase + url);
        });

        group.delete?.forEach(url => {
            console.log(groupBase + url);
        });

        SearchInGroups(group.subgroup, groupBase, currentAppState);
    });
};