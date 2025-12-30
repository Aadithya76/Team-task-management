export default function Header({ title }) {
  return (
    <div className="header">
      <h1>{title.toUpperCase()}</h1>
    </div>
  );
}
