import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { twMerge } from 'tailwind-merge';

import { Button } from '../../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/Dialog';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { stocksActions, stocksSelectors } from '../../store/stocksSlice';

const portal = document.createElement('div');
document.body.appendChild(portal);

export function StocksTableOrderController() {
  const dispatch = useAppDispatch();
  const currentStocks = useAppSelector(stocksSelectors.selectCurrentStocks);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    dispatch(
      stocksActions.reorderCurrentStocks({ startIndex: result.source.index, endIndex: result.destination.index })
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Reorder Stocks</Button>
      </DialogTrigger>

      <DialogContent className='h-[800px]'>
        <DialogHeader>
          <DialogTitle>Reorder Stocks List</DialogTitle>
        </DialogHeader>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId='droppable'>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={twMerge(
                  'p-4 w-full rounded-md bg-secondary/50 duration-100 overflow-auto flex flex-col gap-2',
                  snapshot.isDraggingOver && 'bg-secondary'
                )}
              >
                {currentStocks.map((item, index) => (
                  <Draggable key={item.companyName} draggableId={item.companyName} index={index}>
                    {(provided, snapshot) => {
                      const child = (
                        <div
                          className={twMerge(
                            'p-4 border bg-prime hover:bg-muted/50 rounded-md duration-100',
                            snapshot.isDragging && 'bg-muted'
                          )}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {index + 1}. {item.companyName}
                        </div>
                      );

                      if (!snapshot.isDragging) {
                        return child;
                      }

                      // if dragging - put the item in a portal
                      return ReactDOM.createPortal(child, portal);
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </DialogContent>
    </Dialog>
  );
}
