export function cn(...args: Array<string | boolean | undefined>) {
  return args.filter(Boolean).join(" ");
}