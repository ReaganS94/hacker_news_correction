export default function SingleArticle({ articles }) {
  function timeConverter(UNIX_stamp) {
    let a = new Date(UNIX_stamp * 1000);
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  return (
    <div>
      {articles.map((article) => {
        return (
          <div>
            <h2
              style={{ cursor: "pointer", display: "inline-block" }}
              onClick={() => window.open(article.url, "_blank")}
            >
              {article.title}
            </h2>
            <p>
              Article by: {article.author} | Points: {article.points} | Created
              At: {timeConverter(article.created_at_i)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
