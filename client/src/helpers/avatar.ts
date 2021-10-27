function stringToColor(str: string) {
  let hash = 0;
  let i;

  for (i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
}

export function stringAvatar(
  name: string,
  otherStyles: Record<string, any> = {}
) {
  const [first = "", second = ""] = name.split(" ");
  const firstElement = first.charAt(0);
  const secondElement = second.charAt(0);

  return {
    sx: {
      background: stringToColor(name),
      ...otherStyles,
    },
    children: `${firstElement}${secondElement}`,
  };
}
