/* eslint-disable @next/next/no-html-link-for-pages */
export default function Page() {
  return (
    <main>
      <ul>
        {/* Plain anchors make each visit a document request. */}
        <li>
          <a href="/on-demand/build-time">Build-time slug</a>
        </li>
        <li>
          <a href="/on-demand/runtime">Runtime slug</a>
        </li>
      </ul>
    </main>
  );
}
