export const getTitleByTgUserName = (tgUserName: string) => {
    console.log({ tgUserName })
    const userNamesMapRaw = process.env.NEXT_PUBLIC_USERNAMES_MAP as string;
    let userNamesMap: { username: string, title: string }[] = []
    if (userNamesMapRaw) {
        userNamesMap = JSON.parse(userNamesMapRaw);
        console.log({ userNamesMap })
        const res = userNamesMap.find(i => i.username === tgUserName);
        return res?.title || ''
    }
    else return ''

}