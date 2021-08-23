import { toJpeg } from 'html-to-image';

export const downloadJpeg = async (dom: HTMLElement): Promise<void> => {
  const dataUrl = await toJpeg(dom);
  const link = document.createElement('a');
  link.download = new Date().getTime() + '.jpg';
  link.href = dataUrl;
  link.click();
};
