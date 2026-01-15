import React, { useReducer, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import { quizData } from "@/Data/Dummy";
import { toastSuccess } from "@/Utils/Helper/ToastHelpers";

const getSavedState = () => {
  const saved = localStorage.getItem("active_quiz_state");
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    currentIdx: 0,
    answers: {},
    marked: [],
    timeLeft: 1200, 
    isFinished: false
  };
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'SET_ANSWER':
      return { ...state, answers: { ...state.answers, [action.id]: action.val } };
    case 'NEXT': return { ...state, currentIdx: state.currentIdx + 1 };
    case 'PREV': return { ...state, currentIdx: state.currentIdx - 1 };
    case 'JUMP': return { ...state, currentIdx: action.idx };
    case 'TOGGLE_MARK':
      const isMarked = state.marked.includes(action.id);
      return { 
        ...state, 
        marked: isMarked ? state.marked.filter(i => i !== action.id) : [...state.marked, action.id] 
      };
    case 'TICK': return { ...state, timeLeft: state.timeLeft - 1 };
    case 'FINISH': return { ...state, isFinished: true };
    case 'RESET': return { currentIdx: 0, answers: {}, marked: [], timeLeft: 1200, isFinished: false };
    default: return state;
  }
}

const QuizRoom = () => {
  const [state, dispatch] = useReducer(quizReducer, null, getSavedState); 
  const [showReview, setShowReview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state && !state.isFinished) {
      localStorage.setItem("active_quiz_state", JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    if (!state || state.isFinished) return;
    
    if (state.timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearInterval(timer);
  }, [state?.timeLeft, state?.isFinished]);

  const handleFinish = () => {
    dispatch({ type: 'FINISH' });
    setShowReview(true);
    localStorage.removeItem("active_quiz_state"); 
    toastSuccess("Kuis Selesai! Data tersimpan.");
  };

  if (!state) return null;

  const currentQuestion = quizData[state.currentIdx];

  const calculateScore = () => {
    let correctCount = 0;
    quizData.forEach(q => {
      if (state.answers[q.id] === q.answer) correctCount++;
    });
    return Math.round((correctCount / quizData.length) * 100);
  };

  if (showReview) {
    const finalScore = calculateScore();
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <Card className="text-center py-10 bg-indigo-50 border-2 border-indigo-200">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Hasil Akhir 🏆</h1>
          <p className="text-7xl font-black text-indigo-600 mb-4">{finalScore}</p>
          <p className="text-gray-600">Terima kasih telah mengerjakan kuis!</p>
          <Button className="mt-6" onClick={() => navigate('/admin/quiz')}>Kembali ke Dashboard</Button>
        </Card>

        <h2 className="text-2xl font-bold">Analisis Jawaban</h2>
        <div className="grid gap-4">
          {quizData.map((q, idx) => (
            <Card key={q.id} className={`border-l-8 ${state.answers[q.id] === q.answer ? 'border-green-500' : 'border-red-500'}`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded text-gray-500">SOAL {idx + 1}</span>
                {state.answers[q.id] === q.answer ? 
                  <span className="text-green-600 text-sm font-bold">✓ BENAR</span> : 
                  <span className="text-red-600 text-sm font-bold">✗ SALAH</span>
                }
              </div>
              <h3 className="text-lg font-medium mb-3">{q.question}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-white border rounded-lg">
                  <p className="text-gray-400 text-xs mb-1 uppercase">Pilihan Anda</p>
                  <p className="font-bold">{state.answers[q.id] || "Kosong"}</p>
                </div>
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                  <p className="text-indigo-400 text-xs mb-1 uppercase">Kunci Jawaban</p>
                  <p className="font-bold text-indigo-700">{q.answer}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fadeIn">
      <div className="lg:col-span-3 space-y-4">
        <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 bg-indigo-600 transition-all duration-500" style={{width: `${((state.currentIdx + 1) / quizData.length) * 100}%`}}></div>
            
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 text-red-600 rounded-lg font-mono font-bold text-lg shadow-sm border border-red-100">
                ⏱️ {Math.floor(state.timeLeft / 60)}:{(state.timeLeft % 60).toString().padStart(2, '0')}
                </div>
            </div>
            <span className="text-gray-400 font-bold bg-gray-50 px-3 py-1 rounded-full text-xs">PERTANYAAN {state.currentIdx + 1} DARI {quizData.length}</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 leading-snug mb-10">{currentQuestion.question}</h2>
          
          <div className="grid gap-4">
            {currentQuestion.options.map((opt) => (
              <label key={opt} className={`group flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${state.answers[currentQuestion.id] === opt ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'}`}>
                <input 
                  type="radio" name={`quiz-${currentQuestion.id}`} value={opt} 
                  checked={state.answers[currentQuestion.id] === opt}
                  onChange={() => dispatch({ type: 'SET_ANSWER', id: currentQuestion.id, val: opt })}
                  className="hidden" 
                />
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${state.answers[currentQuestion.id] === opt ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 group-hover:border-indigo-400'}`}>
                  {state.answers[currentQuestion.id] === opt && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <span className={`font-semibold ${state.answers[currentQuestion.id] === opt ? 'text-indigo-900' : 'text-gray-600'}`}>{opt}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100">
            <Button variant="secondary" onClick={() => dispatch({ type: 'PREV' })} disabled={state.currentIdx === 0}>Sebelumnya</Button>
            <Button variant="warning" onClick={() => dispatch({ type: 'TOGGLE_MARK', id: currentQuestion.id })} className="hidden md:block">
              {state.marked.includes(currentQuestion.id) ? '★ Ditandai' : '☆ Tandai Review'}
            </Button>
            {state.currentIdx === quizData.length - 1 ? 
              <Button variant="info" onClick={handleFinish} className="shadow-lg shadow-cyan-200">Kumpulkan Jawaban 🚀</Button> :
              <Button onClick={() => dispatch({ type: 'NEXT' })}>Selanjutnya</Button>
            }
          </div>
        </Card>
      </div>

      <div className="space-y-4">
          <Card className="p-5">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Navigasi</h3>
            <div className="grid grid-cols-5 gap-2">
              {quizData.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => dispatch({ type: 'JUMP', idx: i })}
                  className={`h-10 rounded-xl text-xs font-bold transition-all duration-200 ${
                    state.currentIdx === i ? 'bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-100' : 
                    state.marked.includes(q.id) ? 'bg-yellow-400 text-white' :
                    state.answers[q.id] ? 'bg-green-500 text-white' : 'bg-white border-2 border-gray-100 text-gray-300 hover:border-indigo-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </Card>
          <div className="px-2 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase"><div className="w-2 h-2 bg-indigo-600 rounded-full"></div> Sedang Dibuka</div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Sudah Dijawab</div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div> Perlu Review</div>
          </div>
      </div>
    </div>
  );
};

export default QuizRoom;