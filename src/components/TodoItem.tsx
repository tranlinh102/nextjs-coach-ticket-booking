type TodoItemProps = {
  text: string; // chỉ nhận dữ liệu qua props
};

export default function TodoItem({ text }: TodoItemProps) {
  return (
    <li className="bg-white p-3 rounded shadow-sm">
      {text}
    </li>
  );
}
