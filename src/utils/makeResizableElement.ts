const minimum_size = 20;
let container_original_width = 0;
let container_original_height = 0;
let container_original_x = 0;
let container_original_y = 0;

let original_mouse_x = 0;
let original_mouse_y = 0;

/**
 * A function to make HTML element resizable
 * @param container A HTMLDIVElement acting as a container
 * @param resizers List of controllers which can be dragged for resizing
 * @param textInput A HTMLInputElement for text inputs
 * */

function makeResizableElement(
  container: HTMLDivElement,
  resizers: NodeListOf<HTMLDivElement>,
  textInput: HTMLLabelElement,
  positionLeft: number,
  positionTop: number
) {
  resizers.forEach(resizer => {
    resizer.addEventListener('mousedown', (e: MouseEvent) => {
      const element = e.target as HTMLDivElement;
      if (container.id !== element.parentElement?.id) return;
      e.preventDefault();
      //Getting original width of container
      container_original_width = parseFloat(
        getComputedStyle(container, null).getPropertyValue('width').replace('px', '')
      );

      //Getting the original height of container
      container_original_height = parseFloat(
        getComputedStyle(container, null).getPropertyValue('height').replace('px', '')
      );

      const containerRect = container.getBoundingClientRect();

      container_original_x = containerRect.left;
      container_original_y = containerRect.top;

      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;

      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });

    const isClassPresent = (className: string) => {
      return resizer.classList.contains(className);
    };

    const resize = (e: MouseEvent) => {
      if (resizer.classList.contains('topResizer')) {
        const height = container_original_height - (e.pageY - original_mouse_y);

        if (height > minimum_size) {
          container.style.height = height + 'px';
          textInput.style.height = height - 20 + 'px';
        }
      } else if (isClassPresent('topRightResizer')) {
        const containerWidth = container_original_width + (e.pageX - original_mouse_x);
        const height = container_original_height - (e.pageY - original_mouse_y);

        if (containerWidth > minimum_size) {
          container.style.width = containerWidth + 'px';
          textInput.style.width = containerWidth - 20 + 'px';
        }

        if (height > minimum_size) {
          container.style.height = height + 'px';
          textInput.style.height = height - 20 + 'px';
        }
      } else if (isClassPresent('rightResizer')) {
        const containerWidth = container_original_width + (e.pageX - original_mouse_x);

        if (containerWidth > minimum_size) {
          container.style.width = containerWidth + 'px';
          textInput.style.width = containerWidth - 20 + 'px';
        }
      } else if (isClassPresent('bottomRightResizer')) {
        const containerWidth = container_original_width + (e.pageX - original_mouse_x);
        const height = container_original_height + (e.pageY - original_mouse_y);

        if (containerWidth > minimum_size) {
          container.style.width = containerWidth + 'px';
          textInput.style.width = containerWidth - 20 + 'px';
        }

        if (height > minimum_size) {
          container.style.height = height + 'px';
          textInput.style.height = height - 20 + 'px';
        }
      } else if (resizer.classList.contains('bottomResizer')) {
        const height = container_original_height + (e.pageY - original_mouse_y);

        if (height > minimum_size) {
          container.style.height = height + 'px';
          textInput.style.height = height - 20 + 'px';
        }
      } else if (resizer.classList.contains('bottomLeftResizer')) {
        const containerWidth = container_original_width + (e.pageY - original_mouse_y);
        const height = container_original_height + (e.pageY - original_mouse_y);
        if (containerWidth > minimum_size) {
          container.style.width = containerWidth + 'px';
          textInput.style.width = containerWidth - 20 + 'px';
        }

        if (height > minimum_size) {
          container.style.height = height + 'px';
          textInput.style.height = height - 20 + 'px';
        }
      } else if (resizer.classList.contains('leftResizer')) {
        const containerWidth = container_original_width - (e.pageX - original_mouse_x);

        if (containerWidth > minimum_size) {
          container.style.width = containerWidth + 'px';
          textInput.style.width = containerWidth - 20 + 'px';
        }
      } else if (resizer.classList.contains('topLeftResizer')) {
        const containerWidth = container_original_width - (e.pageX - original_mouse_x);

        if (containerWidth > minimum_size) {
          container.style.width = containerWidth + 'px';
          textInput.style.width = containerWidth - 20 + 'px';

          // problem happens when mouse goes out of scope from the resizer

          // container.style.left = container_original_x + (e.pageX - original_mouse_x) + 'px';
        }
      }
    };

    const stopResize = () => {
      window.removeEventListener('mousemove', resize);
    };
  });
}

export default makeResizableElement;
