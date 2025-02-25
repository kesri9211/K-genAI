import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Searchbar from "../components/Searchbar/Searchbar";
import ImageCard from "../components/ImageCard/ImageCard";
import { GetPosts } from "../api/index.js";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding-bottom: 50px;
  padding: 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 760px) {
    padding: 6px 10px;
  }
`;
const Headline = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Span = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  //get all posts and render on home page by calling the GetPosts function
  const getPosts = async () => {
    setLoading(true);
    await GetPosts()
      .then((res) => {
        setPosts(res?.data?.data);
        setLoading(false);
        setFilteredPosts(res?.data?.data);
      })
      .catch((error) => {
        setError(error?.response?.data?.error || error.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    getPosts();
  }, []);

  //search
  useEffect(() => {
    if (!search) {
      setFilteredPosts(posts);
    }
    const filteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const authorMatch = post?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return promptMatch || authorMatch;
    });

    if (search) {
      setFilteredPosts(filteredPosts);
    }
  }, [posts, search]);

  return (
    <Container>
      <Headline>Explore posts in the community</Headline>
      <Span>⦾Generate with AI⦾</Span>
      <Searchbar search={search} setSearch={setSearch} />
      <Wrapper>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper>
            {filteredPosts.length === 0 ? (
              <>No Posts Found</>
            ) : (
              <>
                {filteredPosts
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <ImageCard key={index} item={item} />
                  ))}
              </>
            )}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
