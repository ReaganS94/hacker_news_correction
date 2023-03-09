//imports
import { useState, useEffect } from "react";
import SingleArticle from "./SingleArticle";
import ReactPaginate from "react-paginate";

export const Search = () => {
  //logic

  const articlesPerPage = 6;

  const [articles, setArticles] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useState();

  useEffect(() => {
    const endOffset = itemOffset + articlesPerPage;
    const getData = async () => {
      try {
        const res = await fetch(
          `https://hn.algolia.com/api/v1/search?query=${userInput}&tags=story`
        );
        const data = await res.json();
        console.log(data.hits);
        setArticles(data.hits.slice(itemOffset, endOffset));
        setTotalPages(Math.ceil(data.hits.length / articlesPerPage));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [userInput, itemOffset]);

  console.log(userInput);

  const handleChange = (page) => {
    const newOffset = page.selected * articlesPerPage;
    console.log(
      `User requested page number ${
        page.selected + 1
      }, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return articles.length ? (
    //return statement
    <div>
      <input
        type="text"
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
      />
      <SingleArticle articles={articles} />
      <ReactPaginate
        nextLabel="Next >"
        previousLabel="< Previous"
        breakLabel="..."
        onPageChange={handleChange}
        pageCount={totalPages}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        pageRangeDisplayed={5}
        marginPagesDisplayed={5}
      />
    </div>
  ) : (
    "Loading..."
  );
};
