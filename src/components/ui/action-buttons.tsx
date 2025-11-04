'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

type ActionButtonProps = {
  id?: string;
  label?: string;
  entityName?: string;
};

export function CreateButton() {
  const pathname = usePathname();
  const href = `${pathname}/create`;

  return (
    <Link
      href={href}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Thêm mới</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function EditButton({ id }: ActionButtonProps) {
  const pathname = usePathname();
  if (!id) return null;
  const href = `${pathname}/${id}/edit`;

  return (
    <Link href={href} className="rounded-md border p-2 hover:bg-gray-100">
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteButton({ id, entityName = 'mục này' }: ActionButtonProps) {
  const pathname = usePathname();

  async function handleDelete() {
    if (!id) return;
    const ok = confirm(`Bạn có chắc muốn xóa ${entityName} không?`);
    if (!ok) return;

    try {
      const res = await fetch(`${pathname}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Không thể xóa');

      alert('Xóa thành công');
      window.location.reload(); // hoặc bạn có thể dùng router.refresh() nếu xài next/navigation
    } catch (err) {
      alert('Lỗi khi xóa!');
      console.error(err);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-4" />
    </button>
  );
}
