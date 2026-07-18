import { nanoid } from "nanoid";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatMetricDateTime(date: string): string {
  const parsed = new Date(date);
  const now = new Date();

  const isToday =
    parsed.getDate() === now.getDate() &&
    parsed.getMonth() === now.getMonth() &&
    parsed.getFullYear() === now.getFullYear();

  const time = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsed);

  if (isToday) {
    return `Hoje, ${time}`;
  }

  const month = new Intl.DateTimeFormat("pt-BR", { month: "short" })
    .format(parsed)
    .replace(/\./g, "");

  return `${parsed.getDate()} ${month}, ${time}`;
}

export function generateProposalSlug(): string {
  return nanoid(12);
}
