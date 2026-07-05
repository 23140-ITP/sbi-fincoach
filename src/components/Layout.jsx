export default function Layout({ sidebar, children, chatPanel }) {
  return (
    <div className="layout-container">
      {sidebar}
      <main className="main-content">
        {children}
      </main>
      <aside className="layout-chat">
        {chatPanel}
      </aside>
    </div>
  );
}
