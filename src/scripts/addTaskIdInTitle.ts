/**
 * textareaを取得
 */
const getTextarea = (): HTMLTextAreaElement|null => {
  const textareas = document.getElementsByTagName('textarea');
  if (textareas.length > 0 && textareas[0].value) {
    return textareas[0];
  }
  return null;
};

/**
 * taskidを取得
 */
const getTaskId = () => {
  return location.pathname.split('/')[2];
};

/**
 * taskがparentかどうかを判定
 */
const isParent = (): boolean => {
  return document.getElementsByClassName('task__parent').length === 0;
};

/**
 * taskidがtextに存在しているか判定
 */
const taskIdExists = (taskId: string, text: string): Boolean => {
  return (new RegExp(`.*\#${taskId}.*`)).test(text);
};

/**
 * taskidをtitleの先頭に追加する
 */
const addTaskIdInTextarea = (taskId: string, textarea: HTMLTextAreaElement) => {
  textarea.focus();
  textarea.value = `#${taskId} ${textarea.value}`;
  textarea.blur();
};

export default (callback: () => void) => {
  const textarea = getTextarea();
  if (!textarea) {
    return;
  }
  const taskId = getTaskId();
  if (isParent() && !taskIdExists(taskId, textarea.value)) {
    addTaskIdInTextarea(taskId, textarea);
  }
  callback();
};
