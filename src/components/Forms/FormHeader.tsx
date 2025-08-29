"use client";

type FormHeaderProps = {
  title: string;
};

export default function FormHeader({ title }: FormHeaderProps) {
  return <h1 className="mb-5 text-4xl font-bold text-amber-400">{title}</h1>;
}
