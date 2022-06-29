import { useReducer, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './Notes.css';
import { useDispatch, useSelector } from 'react-redux';
import Note from './Note';
import { notifActions } from '../../store/reducers/notif';
import { counterActions } from '../../store/reducers/counter';
import cryptoList from '../../constants/cryptoList';

const noteReducer = (status, action) => {
  if (action.type === 'READY') {
    return { isValid: true };
  } else if (action.type === 'NOTREADY') {
    return { isValid: false };
  }
  return { isValid: false };
};

const Notes = () => {
  const NoteElems = elems => {
    const list = elems.data.map((note, index) => {
      const id = 'elem--' + index;
      return (
        <div key={id} id={id} data-testid={id} className="card-container">
          <Note text={note.text} id={id} handlerRemove={e => clickRemoveNote(e, note.text)} />
        </div>
      );
    });
    return <div className="elems-container">{list}</div>;
  };

  const clickAddNote = () => {
    const text = document.querySelector('#noteinput').value.trim();
    document.querySelector('#noteinput').value = '';
    const existsText = data.some(elem => elem.text === text);
    if (!text) {
      dispatch(notifActions.error(`You need something in text to add a new card`));
    } else if (existsText) {
      dispatch(notifActions.error(`There is already an element with text ${text}`));
    } else {
      setData([...data, { text: text }]);
      dispatch(counterActions.increment());
    }
  };

  const clickRemoveNote = (e, text) => {
    const dataFiltered = data.filter(elem => elem.text !== text);
    setData(dataFiltered);
    dispatch(counterActions.remove());
  };

  const dispatch = useDispatch();
  const clickRemoveAllNotes = () => {
    dispatch(counterActions.clear());
    setData([]);
  };

  const [statusNotes, dispatchStatus] = useReducer(noteReducer, { isValid: false });

  const handlerKeyUp = e => {
    dispatchStatus({ type: 'READY' });
    if (e.key === 'Enter') {
      clickAddNote();
      dispatchStatus({ type: 'NOTREADY' });
    } else if (document.querySelector('#noteinput').value === '') {
      dispatchStatus({ type: 'NOTREADY' });
    }
  };

  const [data, setData] = useState([]);

  const counter = useSelector(state => state.counter.counter);
  useEffect(() => {
    if (counter < data.length) {
      for (let i = data.length; i <= counter; i++) {
        data.pop();
        setData([...data]);
      }
    } else if (counter > data.length) {
      const randomCrypto = cryptoList[Math.floor(Math.random() * cryptoList.length)];
      for (let i = data.length; i < counter; i++) {
        setData([...data, { text: randomCrypto.name }]);
      }
    }
  }, [counter, data]);

  return (
    <div className="notes-container">
      <div className="input-container">
        <input
          id="noteinput"
          data-testid="noteinput"
          onKeyUp={handlerKeyUp}
          type="text"
          placeholder="Enter a new note"
          autoComplete="off"
        />
        <Button variant="outlined" onClick={clickAddNote} disabled={!statusNotes.isValid}>
          Add note
        </Button>
        <Button variant="outlined" onClick={clickRemoveAllNotes} className="remove">
          Remove all notes
        </Button>
      </div>
      <>{data.length ? <NoteElems data={data} /> : <p>There are no notes yet...</p>}</>
    </div>
  );
};

export default Notes;
