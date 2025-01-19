export function TableElement({ text }) {
  return (
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900 text-center">{text}</div>
    </td>
  );
}
