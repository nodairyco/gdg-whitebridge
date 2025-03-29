import React, { useState, useEffect } from 'react';
import './style.css';

const StackVisualization = () => {
    const [stack, setStack] = useState([14, 23, 16, 11, 89]);
    const [animationInProgress, setAnimationInProgress] = useState(false);
    const [activeLanguage, setActiveLanguage] = useState('python');

    // Initialize the stack visualization
    useEffect(() => {
        initializeStack();
    }, []);

    const initializeStack = () => {
        // Initial state is already set
    };

    // Push operation
    const push = (value) => {
        if (animationInProgress) return;
        setAnimationInProgress(true);
        if (stack.length >= 5) {
            alert('Stack overflow! Cannot push more than 5 elements.');
            setAnimationInProgress(false);
            return;
        }

        // Add new item to the beginning of the stack
        setStack(prevStack => [value, ...prevStack]);
        // Reset animation state after a delay
        setTimeout(() => {
            setAnimationInProgress(false);
        }, 500);
    };

    // Pop operation
    const pop = () => {
        if (animationInProgress) return;
        setAnimationInProgress(true);
        if (stack.length === 0) {
            alert('Stack underflow! Cannot pop from empty stack.');
            setAnimationInProgress(false);
            return;
        }

        // Remove the first item from the stack after animation
        setTimeout(() => {
            setStack(prevStack => prevStack.slice(1));
            setAnimationInProgress(false);
        }, 500);
    };

    // Button handlers
    const handlePush = () => {
        const value = Math.floor(Math.random() * 90) + 10; // Random number 10-99
        push(value);
    };

    const handlePop = () => {
        pop();
    };

    // Code examples
    const pythonCode = `class Stack:
    def __init__(self):
        self.elements = []
    
    def push(self, item):
        """Add item to the top of the stack."""
        self.elements.append(item)
    
    def pop(self):
        """Remove and return the top item."""
        if self.is_empty():
            raise IndexError("Pop from empty stack")
        return self.elements.pop()
    
    def peek(self):
        """Return the top item without removing it."""
        if self.is_empty():
            raise IndexError("Peek from empty stack")
        return self.elements[-1]
    
    def is_empty(self):
        """Check if the stack is empty."""
        return len(self.elements) == 0
    
    def size(self):
        """Return the number of items in the stack."""
        return len(self.elements)

# Example usage
if __name__ == "__main__":
    stack = Stack()
    stack.push(10)
    stack.push(20)
    stack.push(30)
    print("Pop:", stack.pop())  # 30
    print("Peek:", stack.peek())  # 20
    print("Size:", stack.size())  # 2`;

    const javaCode = `import java.util.ArrayList;
import java.util.EmptyStackException;

public class Stack<T> {
    private ArrayList<T> elements = new ArrayList<>();

    // Push element onto the stack
    public void push(T item) {
        elements.add(item);
    }

    // Pop element from the top
    public T pop() {
        if (isEmpty()) throw new EmptyStackException();
        return elements.remove(elements.size() - 1);
    }

    // Peek at the top element
    public T peek() {
        if (isEmpty()) throw new EmptyStackException();
        return elements.get(elements.size() - 1);
    }

    // Check if stack is empty
    public boolean isEmpty() {
        return elements.isEmpty();
    }

    // Get stack size
    public int size() {
        return elements.size();
    }

    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println("Pop: " + stack.pop()); // 30
        System.out.println("Peek: " + stack.peek()); // 20
        System.out.println("Size: " + stack.size()); // 2
    }
}`;

    return (
        <div className="stack-app-container">
            <h1>Stack Data Structure Visualization</h1>
            
            <div className="main-content">
                {/* Visualization Panel */}
                <div className="visualization-panel">
                    <div className="stack-container">
                        <div className="cont">
                            {stack.map((item, index) => (
                                <div 
                                    key={`${item}-${index}`} 
                                    className={`item ${index === 0 ? 'top-item' : ''}`}
                                    style={{
                                        animation: index === 0 && animationInProgress 
                                            ? 'pushAnimation 0.5s ease' 
                                            : 'none'
                                    }}
                                >
                                    <div className="num">{item}</div>
                                    {index === 0 && <div className="stack-label">TOP</div>}
                                </div>
                            ))}
                        </div>

                        <div className="controls">
                            <button onClick={handlePush} disabled={animationInProgress}>
                                Push
                            </button>
                            <button onClick={handlePop} disabled={animationInProgress}>
                                Pop
                            </button>
                        </div>
                    </div>
                </div>

                {/* Description Panel */}
                <div className="description-panel">
                    <div className="algorithm-description">
                        <h2>Stack (Description)</h2>
                        <p>
                            A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle:
                        </p>
                        <ul>
                            <li><strong>Push:</strong> Add an element to the top of the stack</li>
                            <li><strong>Pop:</strong> Remove and return the top element</li>
                            <li><strong>Peek:</strong> View the top element without removing it</li>
                        </ul>

                        <h3>Time Complexity:</h3>
                        <ul>
                            <li>Push: O(1)</li>
                            <li>Pop: O(1)</li>
                            <li>Peek: O(1)</li>
                        </ul>

                        <h3>Space Complexity:</h3>
                        <p>O(n)</p>
                    </div>

                    <div className="code-tabs">
                        <div className="language-selector">
                            <button 
                                className={activeLanguage === 'python' ? 'active' : ''}
                                onClick={() => setActiveLanguage('python')}
                            >
                                Python
                            </button>
                            <button 
                                className={activeLanguage === 'java' ? 'active' : ''}
                                onClick={() => setActiveLanguage('java')}
                            >
                                Java
                            </button>
                        </div>
                        
                        <div className="code-display">
                            {activeLanguage === 'python' ? (
                                <pre>{pythonCode}</pre>
                            ) : (
                                <pre>{javaCode}</pre>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StackVisualization;
