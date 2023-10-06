window.addEventListener("load", () => {
  try {
    var url_string = window.location.href.toLowerCase();
    var url = new URL(url_string);
    var name = url.searchParams.get("name");
    console.log(name);
  } catch (err) {
    console.log("Issues with Parsing URL Parameter's - " + err);
  }
});
