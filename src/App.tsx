import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';
import Modal from './components/Modal';
import { fetchComments } from './data/fetchComments';
import type { Comment } from './types';
const { Search } = Input;

const App: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
    const [totalComments, setTotalComments] = useState<number>(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchValue, setSearchValue] = useState<string>('');
    const [domainFilters, setDomainFilters] = useState<string[]>([]);

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, [pagination]);
    useEffect(() => {
        let timerId = setTimeout(() => {
            if (searchValue.length > 0) {
                handleSearch(searchValue);
            } else {
                setPagination({...pagination, current: 1});
                fetchData(1, pagination.pageSize);
            }
        }, 300);

        return () => clearTimeout(timerId);
    }, [searchValue]);

    const fetchData = async (current: number, pageSize: number) => {
        const start = (current - 1) * pageSize;
        const end = current * pageSize;
        const response = await fetchComments(start, end);
        setComments(response.data);
        setTotalComments(parseInt(String(response.totalCount)));
    };

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    const handleCommentClick = (comment: Comment) => {
        setSelectedComment(comment);
    };

    const handleModalClose = () => {
        setSelectedComment(null);
    };

    const handleSearch = async (value: string) => {
        setSearchValue(value);
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?email=${value}`);
        const data = await response.json();
        setComments(data);
        setTotalComments(data.length); // 이메일 필터링된 데이터의 총 개수 설정
    };


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a:Comment, b:Comment) => b.id - a.id,
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: Comment, b:Comment) => a.name.localeCompare(b.name),
            render: (text: string, record: Comment) => {
                return <span>{record.name}</span>
            },
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter:false,
            key: 'email',
        },
        {
            title: 'Body',
            dataIndex: 'body',
            sorter:false,
            key: 'body',
        },
    ];

    return (
        <div className="App">
            <h1>Paginated Table Assingment</h1>
            <h2>yeongjae lee</h2>
            <Search placeholder="이메일을 입력하세요." onChange={(e) => setSearchValue(e.target.value)} style={{ marginBottom: 16 }} enterButton={false} />
            <Table
                columns={columns}
                dataSource={comments}
                pagination={{ total: totalComments }}
                onChange={handleTableChange}
                onRow={(record: Comment) => ({
                    onClick: () => handleCommentClick(record),
                })}
            />
            <Modal comment={selectedComment} onCancel={handleModalClose} />
        </div>
    );
};

export default App;
