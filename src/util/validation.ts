import * as yup from 'yup';

export const img = yup.object().shape({
    image: yup.string()
        .required()
        .url()
        .matches(/^https?:\/\/[^\s/$.?#]+\.ltrbxd\.com(\?[^#\s]*)?.*\.(jpeg|jpg|gif|png|webp)$/),
});