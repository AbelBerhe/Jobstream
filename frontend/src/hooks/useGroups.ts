import { useOktaAuth } from "@okta/okta-react"

export const useGroups = (): string[] => {

    const { authState } = useOktaAuth();

    if (!authState?.accessToken?.claims.groups) return [];

    const rawGroups = authState.accessToken.claims.groups;

    if (Array.isArray(rawGroups)) {
        return rawGroups as string[];
    }

    if (typeof rawGroups === "string") {
        return [rawGroups];
    }

    return [];
}

