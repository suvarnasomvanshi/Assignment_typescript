import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import TableCom from '../components/TableCom';
import { GridColDef } from '@mui/x-data-grid';
import { component2Data } from '../utilis';
import SelectComp from '../components/SelectComp';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [errors, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
        if (res.status !== 200) { throw new Error('Network res not') }
        const datas: Post[] = res.data;
        setPosts(datas);
      } catch (error: any) {
        setError(error.message);
      } finally { setLoading(false) }
    }
    fetchData();
  }, [])

  const columns1: GridColDef<(typeof posts)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'userId',
      headerName: 'userId',
      width: 150,
      editable: true,
    },
    {
      field: 'title',
      headerName: 'title',
      width: 280,
      editable: true,
    },
    {
      field: 'body',
      headerName: 'Body',
      type: 'number',
      width: 110,
      editable: true,
    },
  ]

  if (errors) { return <>{errors}</> }
  if (loading) { return <>....Loading</> }

  return (
    <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
      <h2 >POSTS</h2>
      <TableCom rows={posts} columns={columns1} />
      <Box sx={{ maxWidth: { md: "100%", lg: "50%" }, marginTop: "52px", height: "300px", columnGap: "10px" }}>
        {component2Data.map((department) =>
          <SelectComp key={department.department} parent={department.department} childs={department.sub_departments} />
        )}
      </Box>
    </Box>
  )
}

export default Home;
