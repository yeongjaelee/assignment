import type { Comment } from '../types';
interface FetchResponse {
    data: Comment[];
    totalCount: number;
}

export const fetchComments = (start: number, end: number): Promise<FetchResponse> => {
    return fetch(`https://jsonplaceholder.typicode.com/comments?_start=${start}&_end=${end}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(res.headers.get('X-Total-Count'))
            const totalCountHeader = res.headers.get('X-Total-Count');
            const totalCount = totalCountHeader ? parseInt(totalCountHeader) : 0;
            return res.json().then(data => ({ data, totalCount }));
        });
};

