## Assignment

Create a paginated Table utilizing [Ant Design Table](https://ant.design/components/table#components-table-demo-ajax), fetching `comments` data from [this](https://jsonplaceholder.typicode.com/) API resource.

### Paginated Fetch Example

```javascript
// fetch comments with id 1 to 5
fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_end=5');

// fetch comments with id 6 to 8
fetch('https://jsonplaceholder.typicode.com/posts?_start=5&_end=8');
```

When fetching with above, the total comment count is returned on the header as `X-Total-Count` field.

```javascript
fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_end=5').then((res) => {
    console.log(res.headers.get('X-Total-Count'));
});
```

Below are the assessment criteria

1. Table should display `id`, `name`, `email` and `body` as the columns.
2. Data should only be fetched on demand and not preloaded
3. Clicking on an entry in the table should display the comment's details in a modal. A template Modal class is provided. Aesthetics are not important.
4. Implement filter/search functionality on the `email` column via a textbox search. Refer to the API documentation above for fetching filtered results.

Fork this project and perform a pull request within the designated timeframe. Best of luck!
