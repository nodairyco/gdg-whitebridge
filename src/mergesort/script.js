document.addEventListener('DOMContentLoaded', () => {
    const sortButton = document.querySelector('.sortButton');
    const container = document.querySelector('.figures-container');
    
    // Store original order for reset functionality
    const originalOrder = Array.from(container.children).map(el => el.cloneNode(true));
    
    // Add celebration styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .celebrating {
            animation: pulse 0.5s infinite alternate;
        }
        .celebrating-final {
            box-shadow: 0 0 15px gold;
            background-color: #4CAF50 !important;
            transition: all 0.5s ease;
        }
        @keyframes pulse {
            from { 
                transform: scale(1); 
                box-shadow: 0 0 5px rgba(255,215,0,0.5);
            }
            to { 
                transform: scale(1.05); 
                box-shadow: 0 0 15px gold;
            }
        }
        .bounce {
            animation: bounce 0.3s ease;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);

    sortButton.addEventListener('click', async () => {
        sortButton.disabled = true;
        const figures = Array.from(container.children);
        
        // Reset any previous animations
        figures.forEach(fig => {
            fig.classList.remove('celebrating', 'celebrating-final', 'sorted');
            fig.style.transform = '';
        });

        const elements = figures.map(figure => ({
            element: figure,
            value: parseInt(figure.querySelector('.text').textContent),
            originalIndex: figures.indexOf(figure)
        }));
        
        await mergeSortWithContinuousAnimation(elements);
        await celebrationAnimation();
        
        sortButton.disabled = false;
    });
    
    async function mergeSortWithContinuousAnimation(elements) {
        // Create a working copy
        const arr = elements.map((el, index) => ({...el, currentIndex: index}));
        
        // Main merge sort function
        async function mergeSort(start, end) {
            if (start >= end) return;
            
            const mid = Math.floor((start + end) / 2);
            await mergeSort(start, mid);
            await mergeSort(mid + 1, end);
            await merge(start, mid, end);
        }
        
        async function merge(start, mid, end) {
            const left = arr.slice(start, mid + 1);
            const right = arr.slice(mid + 1, end + 1);
            let i = 0, j = 0, k = start;
            
            // Highlight the current merge range
            highlightRange(start, end, true);
            await sleep(500);
            
            while (i < left.length && j < right.length) {
                // Highlight the two elements being compared
                left[i].element.classList.add('comparing');
                right[j].element.classList.add('comparing');
                await sleep(600);
                
                if (left[i].value <= right[j].value) {
                    await moveElementToPosition(left[i], k);
                    arr[k] = left[i];
                    i++;
                } else {
                    await moveElementToPosition(right[j], k);
                    arr[k] = right[j];
                    j++;
                }
                
                left[i]?.element.classList.remove('comparing');
                right[j]?.element.classList.remove('comparing');
                k++;
            }
            
            // Move remaining elements
            while (i < left.length) {
                await moveElementToPosition(left[i], k);
                arr[k] = left[i];
                i++;
                k++;
            }
            
            while (j < right.length) {
                await moveElementToPosition(right[j], k);
                arr[k] = right[j];
                j++;
                k++;
            }
            
            // Remove range highlight
            highlightRange(start, end, false);
            await sleep(600);
        }
        
        async function moveElementToPosition(element, newPosition) {
            const currentPosition = arr.findIndex(item => item.originalIndex === element.originalIndex);
            if (currentPosition === newPosition) return;
            
            element.element.classList.add('moving');
            await sleep(600);
            
            // Calculate new position in DOM
            const referenceElement = container.children[newPosition] || null;
            if (referenceElement) {
                container.insertBefore(element.element, referenceElement);
            } else {
                container.appendChild(element.element);
            }
            
            await sleep(600);
            element.element.classList.remove('moving');
        }
        
        function highlightRange(start, end, highlight) {
            for (let i = start; i <= end; i++) {
                if (highlight) {
                    arr[i].element.classList.add('merge-range');
                } else {
                    arr[i].element.classList.remove('merge-range');
                }
            }
        }
        
        // Start the sorting
        await mergeSort(0, arr.length - 1);
        
        // Mark all as sorted
        arr.forEach(item => {
            item.element.classList.add('sorted');
        });
    }
    
    async function celebrationAnimation() {
        const figures = Array.from(container.children);
        
        // Stage 1: Sequential pulse animation
        for (const figure of figures) {
            figure.classList.add('celebrating');
            await sleep(150);
        }
        await sleep(1000);
        
        // Stage 2: Remove pulse and prepare for bounce
        figures.forEach(fig => {
            fig.classList.remove('celebrating');
            fig.style.transform = '';
        });
        
        // Stage 3: Group bounce animation
        for (let i = 0; i < 2; i++) {
            figures.forEach(fig => fig.classList.add('bounce'));
            await sleep(300);
            figures.forEach(fig => fig.classList.remove('bounce'));
            await sleep(300);
        }
        
        // Stage 4: Final glow effect
        figures.forEach(fig => {
            fig.classList.add('celebrating-final');
        });
        await sleep(1500);
        
        // Clean up
        figures.forEach(fig => {
            fig.classList.remove('celebrating-final');
        });
    }
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});
