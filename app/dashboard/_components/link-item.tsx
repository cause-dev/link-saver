"use client";

const LinkItem = ({
  id,
  url,
  title,
}: {
  id: string;
  url: string;
  title: string;
}) => {
  return (
    <div className="flex items-center justify-center gap-5 rounded-3xl bg-active px-5 py-2">
      <a href={url} target="_blank" className="flex gap-3">
        <h3 className="font-bold">{title}</h3>
        <p>{url}</p>
      </a>
      <button
        onClick={() => console.log(id)}
        className="cursor-pointer rounded-full bg-blue-3 px-5 py-2"
      >
        Delete
      </button>
    </div>
  );
};

export default LinkItem;
