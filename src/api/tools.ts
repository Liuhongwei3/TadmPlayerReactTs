export const parseResponseData = (data: any) => {
    if (typeof data === 'string') {
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    } else {
        try {
            return JSON.parse(JSON.stringify(data));
        } catch (e) {
            return data;
        }
    }
};
