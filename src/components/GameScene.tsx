import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { GAME_DATA } from '../data/mockGameData';
import { soundManager } from '../utils/audio';
import { Star, Trophy, ArrowRight, RotateCcw, XCircle, Volume2, Sparkles, Award, BookOpen } from 'lucide-react';

export const GameScene: React.FC = () => {
  const {
    activePlanetId,
    currentScenarioIndex,
    currentScore,
    selectedCard,
    wrongCardIds,
    phase,
    selectCard,
    retryCard,
    nextScenario,
    exitGame
  } = useGameStore();

  const currentPlanet = GAME_DATA.find((p) => p.id === activePlanetId);

  // Thêm logic tự động tắt/bật nhạc nền khi vào màn hình câu hỏi
  useEffect(() => {
    soundManager.pauseBgm();

    return () => {
      if (soundManager.isBgmEnabled) {
        soundManager.playBgm();
      }
    };
  }, []);

  if (!currentPlanet) return null;

  const currentScenario = currentPlanet.scenarios[currentScenarioIndex];

  const speakSequence = (texts: string[]) => {
    if (!('speechSynthesis' in window) || texts.length === 0) return;
    window.speechSynthesis.cancel();

    let index = 0;
    const playNext = () => {
      if (index >= texts.length) return;
      const utterance = new SpeechSynthesisUtterance(texts[index]);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.9;
      utterance.onend = () => {
        index++;
        playNext();
      };
      window.speechSynthesis.speak(utterance);
    };

    playNext();
  };

  useEffect(() => {
    if (currentScenario && phase === 'context') {
      speakSequence([currentScenario.contextText]);
    } else if (phase === 'summary') {
      const cozySummarySpeech = `Bé giỏi quá đi thôi! Bé đã xuất sắc hoàn thành hành tinh ${currentPlanet.title} rồi nè. Tổng điểm tuyệt vời của bé là ${currentScore} điểm. Bé thật là một em bé ngoan và thông minh!`;
      speakSequence([cozySummarySpeech]);
    }
  }, [currentScenarioIndex, phase]);

  if (phase === 'summary') {
    const planetSummaries: Record<string, string> = {
      'planet-1': 'Bé đã học được cách yêu thương và bảo vệ cơ thể của mình, biết nói không với những đụng chạm không an toàn và luôn tâm sự cùng bố mẹ nhé!',
      'planet-2': 'Bé thật dũng cảm và tự lập khi ở nhà một mình, biết cách từ chối người lạ mở cửa và giữ an toàn cho bản thân thật tốt.',
      'planet-3': 'Bé là một em bé rất lịch sự và biết quan tâm đến mọi người xung quanh, biết giữ gìn không gian sống luôn sạch sẽ và văn minh.'
    };
    const generalKnowledge = planetSummaries[currentPlanet.id] || 'Bé đã nắm vững các kỹ năng sinh tồn và tự bảo vệ mình an toàn trong mọi tình huống.';

    return (
      <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-50 font-cute select-none overflow-y-auto">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 30 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 md:p-8 max-w-xl w-full text-center shadow-[0_0_50px_rgba(245,158,11,0.3)] text-white relative my-auto"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={() => {
              soundManager.playPop();
              speakSequence([`Bé giỏi quá đi thôi! Bé đã xuất sắc hoàn thành hành tinh ${currentPlanet.title} rồi nè. Tổng điểm tuyệt vời của bé là ${currentScore} điểm.`, generalKnowledge]);
            }}
            className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-pink-400 p-2.5 rounded-full shadow transition cursor-pointer"
            title="Nghe lại lời chúc"
          >
            <Volume2 size={20} />
          </button>

          <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-amber-200 animate-bounce">
            <Trophy size={36} className="text-slate-950" />
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 mb-1">
            Bé Giỏi Quá Đi Thôi! 🎉
          </h2>
          <p className="text-pink-300 text-xs md:text-sm mb-5 font-bold">
            Bé đã hoàn thành xuất sắc hành tinh <span className="text-amber-300">{currentPlanet.title}</span> rồi nè!
          </p>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 mb-5 flex items-center justify-around shadow-inner">
            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-400 font-bold mb-1 flex items-center gap-1">
                <Star size={14} className="text-amber-400" /> Tổng Điểm Đạt Được
              </span>
              <span className="text-2xl font-black text-amber-400">{currentScore} đ</span>
            </div>

            <div className="w-px h-10 bg-slate-700" />

            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-400 font-bold mb-1 flex items-center gap-1">
                <Award size={14} className="text-pink-400" /> Danh Hiệu
              </span>
              <span className="text-base font-black text-pink-300">Siêu Sao Kỹ Năng</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/40 rounded-2xl p-4 mb-6 text-left shadow-md relative">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
                <BookOpen size={18} className="text-indigo-400" /> Bài học nhỏ cho bé yêu:
              </h4>
              <button
                type="button"
                onClick={() => {
                  soundManager.playPop();
                  speakSequence([generalKnowledge]);
                }}
                className="p-1.5 bg-indigo-900/80 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-full transition cursor-pointer"
                title="Nghe bài học này"
              >
                <Volume2 size={16} />
              </button>
            </div>
            <p className="text-indigo-200 text-xs md:text-sm leading-relaxed font-medium">
              {generalKnowledge}
            </p>
          </div>

          <button 
            onClick={() => {
              window.speechSynthesis?.cancel();
              soundManager.playPop();
              exitGame();
            }}
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 rounded-2xl font-black text-base shadow-xl transition-all hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles size={18} /> Trở về Bản Đồ Vũ Trụ Khám Phá Tiếp
          </button>
        </motion.div>
      </div>
    );
  }

  if (!currentScenario) return null;

  const displayImage = phase === 'context' 
    ? currentScenario.baseImages[0] 
    : (selectedCard?.resultImages[0] || currentScenario.baseImages[0]);

  const handleCardClick = (card: any, index: number, isWrong: boolean) => {
    if (isWrong) return;
    
    if (card.isBest) {
      soundManager.playPop();
    } else {
      soundManager.playWrong();
    }
    
    selectCard(card, index);

    const cardText = `${card.title}. ${card.description}`;
    const subtitleText = card.resultSceneText || '';
    const feedbackText = card.feedback || '';

    setTimeout(() => {
      speakSequence([cardText, subtitleText, feedbackText]);
    }, 200);
  };

  const maxPossibleScore = currentPlanet.scenarios.length * 1000;
  const scorePercentage = Math.min(Math.max((currentScore / maxPossibleScore) * 100, 5), 100);

  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col p-4 z-50 font-cute select-none">
      <header className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-4 text-white shadow-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              window.speechSynthesis?.cancel();
              soundManager.playPop();
              exitGame();
            }} 
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition cursor-pointer"
            title="Thoát về bản đồ"
          >
            <XCircle size={24} />
          </button>
          <h2 className="text-xl md:text-2xl font-black text-amber-300">{currentPlanet.title}</h2>
          <span className="text-xs md:text-sm text-slate-400 font-bold bg-slate-800 px-3 py-1 rounded-full">
            Câu {currentScenarioIndex + 1} / {currentPlanet.scenarios.length}
          </span>
        </div>

        <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 px-4 py-2 rounded-full">
          <div className="flex items-center gap-1.5 font-extrabold text-amber-400 text-sm md:text-base shrink-0">
            <Star size={20} fill="currentColor" />
            <span>{currentScore} Điểm</span>
          </div>
          
          <div className="hidden sm:flex flex-col w-24 md:w-32">
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <motion.div 
                className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full"
                animate={{ width: `${scorePercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative shadow-lg min-h-[280px]">
          <img 
            src={displayImage} 
            alt="Tình huống game" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/600x400/png?text=Image+Not+Found';
            }}
          />

          <button
            onClick={() => {
              soundManager.playPop();
              if (phase === 'context') {
                speakSequence([currentScenario.contextText]);
              } else if (selectedCard) {
                speakSequence([selectedCard.title, selectedCard.resultSceneText || '', selectedCard.feedback || '']);
              }
            }}
            className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-800 border border-pink-500/50 p-3 rounded-full text-pink-400 shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
            title="Nghe đọc lại"
          >
            <Volume2 size={24} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-6 pt-24">
            <motion.p 
              key={phase + currentScenarioIndex} 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-base md:text-xl font-bold leading-relaxed drop-shadow-md"
            >
              {phase === 'context' ? currentScenario.contextText : selectedCard?.resultSceneText}
            </motion.p>
          </div>
        </div>

        <div className="w-full lg:w-[560px] bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col shadow-lg overflow-y-auto">
          {phase === 'context' ? (
            <div className="flex flex-col h-full justify-between">
              <h3 className="text-xl font-extrabold text-white mb-3 flex items-center gap-2">
                🎯 Bé sẽ chọn cách nào thông minh nhất?
              </h3>
              
              <div className="flex flex-wrap gap-4 flex-1 items-center justify-center">
                {currentScenario.cards.map((card, idx) => {
                  const isWrong = wrongCardIds.includes(card.id);
                  return (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card, idx, isWrong)}
                      className={`relative group overflow-hidden rounded-3xl border-3 transition-all duration-300 flex flex-col justify-end w-full sm:w-[calc(50%-8px)] h-[210px] md:h-[230px] ${
                        isWrong 
                          ? 'border-slate-800 bg-slate-900/50 opacity-40 cursor-not-allowed grayscale pointer-events-none' 
                          : 'border-slate-700 hover:border-pink-500 shadow-xl cursor-pointer hover:scale-[1.03]'
                      }`}
                    >
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-110 pointer-events-none" 
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10 pointer-events-none" />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundManager.playPop();
                          speakSequence([`${card.title}. ${card.description}`]);
                        }}
                        className="absolute top-3 right-3 p-2.5 bg-slate-950/80 hover:bg-pink-600 text-pink-400 hover:text-white rounded-full transition shadow-lg backdrop-blur-md cursor-pointer z-30"
                        title="Nghe đáp án này"
                      >
                        <Volume2 size={18} />
                      </button>

                      <div className="relative z-20 p-4 w-full pointer-events-none">
                        <h4 className="font-black text-white text-base md:text-lg leading-snug mb-1 drop-shadow-md">
                          {card.title}
                        </h4>
                        <p className="text-slate-200 text-xs md:text-sm line-clamp-2 leading-relaxed drop-shadow">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col h-full justify-between"
            >
              <div>
                <h3 className={`text-2xl font-black mb-3 ${selectedCard?.isBest ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {selectedCard?.isBest ? '✨ Bé chọn siêu chuẩn luôn!' : '💡 Ôi chưa đúng lắm rồi bé ơi!'}
                </h3>
                
                <div className={`p-4 rounded-2xl border mb-6 ${
                  selectedCard?.isBest ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                }`}>
                  <p className="text-sm font-bold leading-relaxed">
                    {selectedCard?.feedback}
                  </p>
                </div>
              </div>

              <div>
                {selectedCard?.isBest ? (
                  <button 
                    onClick={() => {
                      window.speechSynthesis?.cancel();
                      soundManager.playPop();
                      nextScenario();
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white p-4 rounded-2xl font-extrabold text-base transition shadow-lg cursor-pointer"
                  >
                    Tiếp tục hành trình <ArrowRight size={20} />
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      window.speechSynthesis?.cancel();
                      soundManager.playPop();
                      retryCard();
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 p-4 rounded-2xl font-extrabold text-base transition shadow-lg cursor-pointer"
                  >
                    <RotateCcw size={20} /> Thử chọn lại cách khác nhé bé
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};