export const checkInput = (image: string): boolean => {
    return (/^https?:\/\/[^\s/$.?#]+\.ltrbxd\.com/.test(image) && /.(jpeg|jpg|gif|png|webp)$/.test(image) && image !== "");
};
