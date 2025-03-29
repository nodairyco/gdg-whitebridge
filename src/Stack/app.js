document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.cont');
    const items = document.querySelectorAll('.item');
    const stack = [14, 23, 16, 11, 89];
    let animationInProgress = false;

    // Initialize the stack visualization
    function initializeStack() {
        items.forEach((item, index) => {
            item.querySelector('.num').textContent = stack[index];
            item.style.display = 'flex';
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
        });
    }

    // Push operation
    function push(value) {
        if (animationInProgress) return;
        animationInProgress = true;
        
        if (stack.length >= 5) {
            alert('Stack overflow! Cannot push more than 5 elements.');
            animationInProgress = false;
            return;
        }

        // Create new item element
        const newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.style.opacity = '0';
        newItem.style.transform = 'translateY(-60px)';
        newItem.style.position = 'absolute';
        newItem.style.top = '0';
        
        const newNum = document.createElement('div');
        newNum.className = 'num';
        newNum.textContent = value;
        newItem.appendChild(newNum);
        
        container.insertBefore(newItem, container.firstChild);
        
        // Move all existing items down
        const currentItems = document.querySelectorAll('.item:not(:first-child)');
        currentItems.forEach(item => {
            item.style.transition = 'transform 0.5s ease';
            item.style.transform = 'translateY(80px)';
        });
        
        // Animate the new item
        setTimeout(() => {
            newItem.style.transition = 'all 0.5s ease';
            newItem.style.opacity = '1';
            newItem.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                newItem.style.position = 'relative';
                currentItems.forEach(item => {
                    item.style.transform = 'translateY(0)';
                });
                stack.unshift(value);
                animationInProgress = false;
            }, 500);
        }, 50);
    }

    // Pop operation
    function pop() {
        if (animationInProgress) return;
        animationInProgress = true;
        
        if (stack.length === 0) {
            alert('Stack underflow! Cannot pop from empty stack.');
            animationInProgress = false;
            return;
        }

        const topItem = container.querySelector('.item');
        
        // Move all remaining items up
        const remainingItems = document.querySelectorAll('.item:not(:first-child)');
        remainingItems.forEach(item => {
            item.style.transition = 'transform 0.5s ease';
            item.style.transform = 'translateY(-80px)';
        });
        
        // Animate the pop
        topItem.style.transition = 'all 0.5s ease';
        topItem.style.opacity = '0';
        topItem.style.transform = 'translateY(-60px)';
        
        setTimeout(() => {
            stack.shift();
            container.removeChild(topItem);
            
            // Reset positions of remaining items
            setTimeout(() => {
                remainingItems.forEach(item => {
                    item.style.transform = 'translateY(0)';
                });
                animationInProgress = false;
            }, 50);
        }, 500);
    }

    // Button handlers
    window.handlePush = () => {
        const value = Math.floor(Math.random() * 90) + 10; // Random number 10-99
        push(value);
    };

    window.handlePop = () => {
        pop();
    };

    // Initialize the stack
    initializeStack();
});
