# React Gallery

A photo gallery built with React to access the [Flickr.com API](https://www.flickr.com/services/developer/api/).

---

## Live Preview

[https://angry-allen-f2aca0.netlify.app/](https://angry-allen-f2aca0.netlify.app/)

---

## To install and run project locally

```cmd
> git clone https://github.com/danpoynor/react-gallery-app.git
> cd react-gallery-app
> npm install
> npm start
```

---

## Features

- App displays a loading indicator each time the app fetches new data.
- Three default clickable topics are provided: `Fat Cats`, `Mean Dogs`, and `Big Birds`.
- Clicking on a topic will display a loading indicator as data is fetched.
- Using the browser's forward and back buttons displays correct data.
- Search feature allows searching for photos by tag.
- "No Results Found" message appears if no matches found for a search.
  - [http://localhost:3000/search/unknowsearchtext](http://localhost:3000/search/unknowsearchtext)
- "404: Page Not Found" message appears when a URL path does not match an existing route.
  - [http://localhost:3000/noroute](http://localhost:3000/noroute)

---

## Technical Notes

The Flickr `apiKey` is stored in an un-committed `.env` file which not part of this repo. The key is included in the `config.js` file as:

```js
export const apiKey = process.env.REACT_APP_FLICKR_API_KEY;
```

which loads the key from the `.env` file, which contains:

```js
REACT_APP_FLICKR_API_KEY=a123456789012345678901234567980z
```

- No class components used. All are functional components using Hooks (released as part of [React 16.8.0](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html), Feb 2019)
- [Axios](https://axios-http.com/) used to fetch data from the Flickr API.
- [React Router v6](https://reactrouter.com/) used instead of v4 or v5. [v6 release announcement](https://remix.run/blog/react-router-v6), [Docs](https://reactrouter.com/docs/en/v6)
- ESLint configured to enforce consistent coding standards.
- [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) used to validate properties passed to components.
- React component [Unit and Integration tests](https://reactjs.org/docs/testing.html) added using [Jest](https://jestjs.io/docs/getting-started) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

<details>
<summary>Why no class components?</summary>

From the [React docs](https://reactjs.org/docs/hooks-intro.html#classes-confuse-both-people-and-machines):

<blockquote>...However, we found that class components can encourage unintentional patterns that make these optimizations fall back to a slower path. Classes present issues for today’s tools, too. For example, classes don’t minify very well, and they make hot reloading flaky and unreliable. We want to present an API that makes it more likely for code to stay on the optimizable path.
<br><br>
To solve these problems, Hooks let you use more of React’s features without classes. Conceptually, React components have always been closer to functions. Hooks embrace functions, but without sacrificing the practical spirit of React. Hooks provide access to imperative escape hatches and don’t require you to learn complex functional or reactive programming techniques.</blockquote>

See also: [React Hooks FAQ](https://reactjs.org/docs/hooks-faq.html)
Custom hooks examples: [usehooks.com](https://usehooks.com/)

</details>

---

## Flickr API References

- [Flickr API documentation](https://www.flickr.com/services/api/)
- [Flickr Search params](https://www.flickr.com/services/api/flickr.photos.search.html)
- [Flickr image sizes](https://www.flickr.com/services/api/misc.urls.html)

---

## Additional Edits Made

- Included responsive layout for mobile devices.
- If user tries to access `/tags/not-a-predefined-tag` they are presented with "404: Page Not Found" message.
- If user tries to access `/tag/` directly, the message "Select a button name above" appears.
- If user tries to access `/search/` directly, the message "Enter text to search for above" appears.
- Color swatch navigation added to search photos by color.
- If user tries to access `/color` directly, they are redirected to `/` (home screen).
- Updated CSS styles while maintaining the general arrangement, spacing, and positioning in mockups.
- Browsers `<title>` tag updates to reflect the current tag or search term, such as "Flickr.com results for mean dogs".
- Footer includes a copyright disclaimer, just in case.
- If user hard reloads `/tag/:tagTerm`, `/search/:searchTerm`, or  `/color/:colorTerm` page, or if they access the pages directly (bypassing homepage), photos are still shown and no errors appear.
- API results are saved to `sessionStorage` to persist across potential page refreshes without making additional API calls.
- Static settings params defined in the `config.js` file for convenient editing.
- `_redirects` file added to `public/` directory for [Netlify](https://www.netlify.com/) hosting to handle React routing.
- Search field maintains search phrase on page reload and when using the browser's forward and back buttons.
- Added unit/ui tests and some integration tests.

---

## Developer Notes

<details>

<summary>Components use <code>default</code> import/export syntax</summary>

Since they only export one thing, these components are using the `default` imports/exports syntax. Otherwise, there would be benefits to using `named` imports/exports.

- Source: [https://create-react-app.dev/docs/importing-a-component/](https://create-react-app.dev/docs/importing-a-component/)
- Source: [https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript](https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript)

</details>

<details>

<summary>Avoid installing or using <code>react-router</code> directly</summary>

If you're writing an application that will run in the browser, you should instead install `react-router-dom`. Similarly, if you are writing a React Native application, you should instead install `react-router-native`. Both of those will install `react-router` as a dependency. <em>never `import` anything directly from the `react-router` package</em>. You should have everything you need in either `react-router-dom` or `react-router-native`.

- Source: [https://github.com/remix-run/react-router/tree/main/packages/react-router](https://github.com/remix-run/react-router/tree/main/packages/react-router)

</details>

<details>

<summary>To use PropTypes for type checking, install the <code>prop-types</code> npm explicitly</summary>

You should never rely on other packages "transitive dependencies" just "being there". Always explicitly install them (and add them to package.json) to avoid them breaking. For example if React uses PropTypes internally (without exposing them), it could potentially remove them or change their major version, and do so in a patch release. This is safe if they're not exposed.

- Source: [https://github.com/facebook/create-react-app/issues/3985#issuecomment-363410237](https://github.com/facebook/create-react-app/issues/3985#issuecomment-363410237)
- React PropTypes Documentation: [https://reactjs.org/docs/typechecking-with-proptypes.html](https://reactjs.org/docs/typechecking-with-proptypes.html)
- Repo: [https://github.com/facebook/prop-types](https://github.com/facebook/prop-types)

</details>

<details>

<summary>It's very common for your data lookups to use a <code>number</code> type, but URL params are always <code>string</code> type.</summary>

If needed, use something like `parseInt(params.invoiceId, 10)` to convert a URL param to a number.

- Source: [https://reactrouter.com/docs/en/v6/getting-started/tutorial](https://reactrouter.com/docs/en/v6/getting-started/tutorial)

</details>

<details>

<summary>React Testing Library Notes</summary>

- It doesn't replace Jest. It works with Jest (or Mocha).
- Is a replacement for Enzyme (created by AirbnB)
- RTL is all about testing what is output on the DOM.
- You can have an 'await' to wait for an elements to appear or data to load.
- Instead of testing `state`, you should test what's in the DOM (which is what user would see).
- There is a [Babel plugin](https://www.npmjs.com/package/babel-plugin-react-remove-properties) that can be used to remove `data-test` or `data-testid` attributes from your code if needed.
- If you don't want to use `data-testid` you can use regular DOM methods and properties to query elements, such as

```js
const firstLiInDiv = container.querySelector('div li')
const allLisInDiv = container.querySelectorAll('div li')
const rootElement = container.firstChild
```

- Avoid using the DOM: React Testing Library provides methods for semantically querying DOM elements so that we can test our page in the most accessible way. Instead of searching by class name, we find elements by [role](https://testing-library.com/docs/queries/byrole), [label](https://testing-library.com/docs/queries/bylabeltext), [placeholder text](https://testing-library.com/docs/queries/byplaceholdertext), [text content](https://testing-library.com/docs/queries/bytext), [display value](https://testing-library.com/docs/queries/bydisplayvalue), [alt text](https://testing-library.com/docs/queries/byalttext), [title](https://testing-library.com/docs/queries/bytitle), or by using a [data-testid](https://testing-library.com/docs/queries/bytestid). Folks coming from Enzyme or other UI testing libraries that use heavy DOM traversal to select DOM nodes may bring that into RTL testing.
- If there are multiple items with the same role in the rendered content, you can query a specific element by its 'accessible name' such as its text content, label text, or value of the aria-label. `getByAltText('fancy image')` and `getByRole('img', { name: 'fancy image' })` are equivalent.
- [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom) provides a set of custom jest matchers that you can use to extend jest and assert various things about the state of a DOM. It helps you avoid repetitive patterns that arise in doing so, such as checking for an element's attributes, its text content, its css classes
- [`@testing-library/dom`](https://www.npmjs.com/package/@testing-library/dom) facilitate querying the DOM in the same way the user would. Finding form elements by their label text (just like a user would), finding links and buttons from their text (like a user would), and more. It also exposes a recommended way to find elements by a data-testid as an "escape hatch" for elements where the text content and label do not make sense or is not practical. This library encourages your applications to be more accessible and allows you to get your tests closer to using your components the way a user will, which allows your tests to give you more confidence that your application will work when a real user uses it.
It's important that `@testing-library/dom` is resolved to the same installation required by the framework wrapper of your choice. Usually this means that if you use one of the [framework wrappers](https://testing-library.com/docs/dom-testing-library/install#wrappers), you should not add @testing-library/dom to your project dependencies.
- [`@testing-library/user-event`](https://testing-library.com/docs/user-event/intro/) unlike [`fireEvent`](https://testing-library.com/docs/dom-testing-library/api-events#fireevent), `user-event` dispatches events like they would happen if a user interacted with the document. That might lead to the same events you previously dispatched per `fireEvent` directly, but it also might catch bugs that make it impossible for a user to trigger said events.
This is [why you should use user-event](https://ph-fritsche.github.io/blog/post/why-userevent) to test interaction with your components.

</details>

<details>

<summary>The <code>useEffect</code> hook can be useful for side effects</summary>

- By default, <code>useEffect</code> runs both after the first render and after every update. This can be [customized](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects) though to optimize performance.
- `useEffect` allows us to do things that don't have to do with the render of the component, but that are just a side effects. Such as doing a console.log or title update when a value changes:

```js
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count changed to ${count}`); // This will log when the count changes
    // Could also update the document title using the browser API
    document.title = `You clicked ${count} times`;
  }); // No dependency array necessary. Adding [] will only reader default value 0

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- It's okay to have more than one `useEffect` and have each log a different variable if it changes.
- Unlike `componentDidMount` or `componentDidUpdate`, effects scheduled with `useEffect` don't block the browser from updating the screen. This makes your app feel more responsive. The majority of effects don’t need to happen synchronously. In the uncommon cases where they do (such as measuring the layout), there is a separate [useLayoutEffect](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) Hook with an API identical to useEffect.
- Tip: [Use Multiple Effects to Separate Concerns](https://reactjs.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns)
- Tip: [Optimize Performance by Skipping Effects](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects)
- useEffects docs: [https://reactjs.org/docs/hooks-effect.html](https://reactjs.org/docs/hooks-effect.html)

</details>

<details>

<summary>Testing notes</summary>

Resources:

- Testing-Library
  -[Testing-Library](https://testing-library.com/)
  - [Testing-Library Docs](https://testing-library.com/docs/react-testing-library/intro)
  - [Testing-Library Docs: Querying](https://testing-library.com/docs/react-testing-library/api-queries)
  - [Testing-Library Examples](https://testing-library.com/docs/example-codesandbox)
  - [react-testing-examples.com](https://react-testing-examples.com/jest-rtl/)
  - [Testing-Library Query Playground](https://testing-playground.com/)
    - [Query Playground: Chrome DevTools Extension](https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano)
    - [Query Playground: Firefox DevTools Extension](https://addons.mozilla.org/en-US/firefox/addon/testing-playground/)

</details>

---

## Potential TODOs

- Improve initial view to look more like a home page or landing page.
- Perhaps show random or new photos on initial page load.
- Show list of search terms so users can see what they can search for and click on them to see the results again.
- Allow 'text' searches instead of just 'tag' searches.
- Add 'mostly-' so some color tags to get potentially better results.
- Check into why using API doesn't show same results as searching on the actual site flickr.com.
- Expire sessionStorage in case browser isn't closed for hours so new photo results are shown.
- Allow combining search criteria, such as being able to select both 'fat cats' and 'orange'.
- Add a search hint to the `<SearchForm>` noting case-insensitivity, what's being searched, and use of minus sign (-) to exclude words perhaps.
- Add [pace.js](https://codebyzach.github.io/pace/) to show progress bar or loading spinner while waiting for photos to download. Add to [public folder](https://create-react-app.dev/docs/using-the-public-folder#when-to-use-the-public-folder)
- Create end-to-end tests: Use a framework like Cypress, Playwright (or Selenium?) or a library like Puppeteer, so I can navigate between multiple routes and assert on side effects not just in the browser, but potentially on the backend as well.
- Show loading animation while images download.

---

## This Project Was Bootstrapped with `Create React App`

<details>
<summary>More info</summary>

[Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project, so you have full control over them. All the commands except `eject` will still work, but they will point to the copied scripts, so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

</details>
