export const splitFullName = (fullName: string) => {

    fullName = fullName.trim();
    const lastSpaceIndex = fullName.lastIndexOf(" ");
    if (lastSpaceIndex === -1) {
        return { first_name: fullName, last_name: "" };
    }

    const first_name = fullName.slice(0, lastSpaceIndex);
    const last_name = fullName.slice(lastSpaceIndex + 1);

    return { first_name, last_name };
}