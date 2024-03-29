export const getTitleByTgUserName = (tgUserName: string) => {
  const userNamesMapRaw = process.env.NEXT_PUBLIC_USERNAMES_MAP as string;

  let userNamesMap: { username: string, title: string }[] = [];
  if (userNamesMapRaw) {
    userNamesMap = JSON.parse(userNamesMapRaw);
    const res = userNamesMap.find(i => i.username === tgUserName);
    return res?.title || '';
  }
  else return '';
};