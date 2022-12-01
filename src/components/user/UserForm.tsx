import React from 'react';
import { User } from '@/types/user';
import Input from '../common/Input';
import Label from '../common/Label';
import Button from '../common/Button';

interface UserModalProps {
  selectedUser?: User;
}

export default function UserForm({ selectedUser }: UserModalProps) {
  return (
    <>
      <form>
        <Label htmlFor="name">이름</Label>
        <Input name="name" id="name" placeholder="이름" />

        <Label>권한</Label>
        <select defaultValue={selectedUser?.role || ''}>
          <option value="admin">관리자</option>
          <option value="user">사용자</option>
        </select>

        <Button buttonType="primary">저장</Button>
      </form>
    </>
  );
}
