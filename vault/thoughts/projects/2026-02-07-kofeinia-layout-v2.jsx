/**
 * Планировка кофейни "Кофе с собой" — Интерактивный компонент (v2)
 * Создано: 26 января 2026 (AI-assisted design)
 * Сохранено: 7 февраля 2026
 *
 * Площадь: 40 м² (8м × 5м), прямоугольный павильон
 * Зоны: бариста (8м²), мойка (3м²), склад (5м²), обслуживание (6м²),
 *        витрина (1.5м²), гостевая (12м²), вход (6м²)
 *
 * Связано: thoughts/projects/2026-02-07-kofeinia-research-summary.md
 */

import React, { useState } from 'react';
import { Coffee, Users, Box, Droplets, Grid, Info, DoorOpen } from 'lucide-react';

const CoffeeShopLayout = () => {
  const [showGrid, setShowGrid] = useState(true);
  const [selectedZone, setSelectedZone] = useState(null);

  const zones = {
    barista: {
      name: 'Рабочая зона бариста',
      area: '8 м²',
      description: 'Кофемашина, кофемолка, рабочие поверхности',
      color: '#8B4513',
      equipment: [
        'Кофемашина (60×50 см)',
        'Кофемолка (25×35 см)',
        'Рабочая поверхность (180×60 см)',
        'Полки для посуды',
        'Блендер, чайник'
      ]
    },
    washing: {
      name: 'Зона мойки',
      area: '3 м²',
      description: 'Раковина, сушилка, хранение чистой посуды',
      color: '#4682B4',
      equipment: [
        'Раковина двухсекционная (100×60 см)',
        'Сушилка для посуды',
        'Полка для чистой посуды',
        'Мусорное ведро'
      ]
    },
    service: {
      name: 'Зона обслуживания',
      area: '6 м²',
      description: 'Стойка выдачи, касса',
      color: '#D2691E',
      equipment: [
        'Стойка выдачи (120×50 см)',
        'Касса',
        'Держатели для стаканов',
        'Диспенсеры для крышек и трубочек',
        'Меню на стене'
      ]
    },
    display: {
      name: 'Витрина для десертов',
      area: '1.5 м²',
      description: 'Холодильная витрина с пирожными',
      color: '#FFB6C1',
      equipment: [
        'Холодильная витрина (80×60 см)',
        'Подсветка',
        'Полки на 3 уровня',
        'Ценники'
      ]
    },
    storage: {
      name: 'Склад/подсобка',
      area: '5 м²',
      description: 'Стеллажи, холодильник, запасы',
      color: '#696969',
      equipment: [
        'Стеллажи для продуктов',
        'Холодильник/морозилка',
        'Запасы кофе, молока',
        'Одноразовая посуда',
        'Моющие средства'
      ]
    },
    guest: {
      name: 'Гостевая зона',
      area: '12 м²',
      description: '3 столика на 6-9 человек',
      color: '#8FBC8F',
      equipment: [
        'Столик 1: 70×70 см (2-3 места)',
        'Столик 2: 70×70 см (2-3 места)',
        'Столик 3: 80×80 см (3-4 места)',
        'Стулья: 8-9 шт',
        'Вешалка для одежды'
      ]
    },
    entrance: {
      name: 'Входная зона',
      area: '6 м²',
      description: 'Вход, проход, зона ожидания',
      color: '#F4A460',
      equipment: [
        'Входная дверь (справа внизу)',
        'Коврик',
        'Место для очереди',
        'Меню на стене/стойке',
        'Урна у входа'
      ]
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Планировка кофейни "Кофе с собой" (обновлено)</h1>
        <p className="text-gray-600">Площадь: 40 м² (8м × 5м) • Формат: прямоугольный павильон</p>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
          >
            <Grid size={16} />
            {showGrid ? 'Скрыть сетку' : 'Показать сетку'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
            <svg viewBox="0 0 800 500" className="w-full border-2 border-gray-800 bg-white">
              {showGrid && (
                <g opacity="0.2">
                  {[...Array(17)].map((_, i) => (
                    <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="#999" strokeWidth="1"/>
                  ))}
                  {[...Array(11)].map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#999" strokeWidth="1"/>
                  ))}
                </g>
              )}

              {/* ЗОНА МОЙКИ */}
              <g onClick={() => setSelectedZone('washing')} className="cursor-pointer">
                <rect x="10" y="10" width="190" height="100" fill={zones.washing.color} opacity="0.3" stroke="#333" strokeWidth="2"/>
                <text x="105" y="50" textAnchor="middle" fontSize="14" fontWeight="bold">МОЙКА</text>
                <text x="105" y="70" textAnchor="middle" fontSize="12">3 м²</text>
                <rect x="30" y="25" width="90" height="55" fill="#87CEEB" stroke="#333" strokeWidth="2" rx="5"/>
                <circle cx="55" cy="52" r="15" fill="#fff" opacity="0.7"/>
                <circle cx="105" cy="52" r="15" fill="#fff" opacity="0.7"/>
                <rect x="130" y="30" width="50" height="45" fill="#DDD" stroke="#333" strokeWidth="1"/>
                <text x="155" y="57" textAnchor="middle" fontSize="9">Сушка</text>
              </g>

              {/* СКЛАД/ПОДСОБКА */}
              <g onClick={() => setSelectedZone('storage')} className="cursor-pointer">
                <rect x="10" y="120" width="190" height="130" fill={zones.storage.color} opacity="0.3" stroke="#333" strokeWidth="2"/>
                <line x1="200" y1="120" x2="200" y2="250" stroke="#000" strokeWidth="4"/>
                <text x="105" y="175" textAnchor="middle" fontSize="14" fontWeight="bold">СКЛАД</text>
                <text x="105" y="195" textAnchor="middle" fontSize="12">5 м²</text>
                <rect x="20" y="130" width="170" height="25" fill="#555" opacity="0.5"/>
                <rect x="20" y="160" width="170" height="25" fill="#555" opacity="0.5"/>
                <rect x="25" y="200" width="60" height="40" fill="#fff" stroke="#333" strokeWidth="1"/>
                <text x="55" y="225" textAnchor="middle" fontSize="10">Холод.</text>
              </g>

              {/* РАБОЧАЯ ЗОНА БАРИСТА */}
              <g onClick={() => setSelectedZone('barista')} className="cursor-pointer">
                <rect x="210" y="10" width="300" height="160" fill={zones.barista.color} opacity="0.3" stroke="#333" strokeWidth="2"/>
                <text x="360" y="50" textAnchor="middle" fontSize="16" fontWeight="bold">РАБОЧАЯ ЗОНА БАРИСТА</text>
                <text x="360" y="70" textAnchor="middle" fontSize="12">8 м²</text>
                <rect x="230" y="100" width="70" height="55" fill="#654321" stroke="#333" strokeWidth="2" rx="3"/>
                <circle cx="250" cy="125" r="12" fill="#333"/>
                <circle cx="280" cy="125" r="12" fill="#333"/>
                <text x="265" y="148" textAnchor="middle" fontSize="10" fill="#fff">Кофемашина</text>
                <rect x="310" y="110" width="35" height="40" fill="#8B4513" stroke="#333" strokeWidth="2" rx="3"/>
                <text x="327" y="150" textAnchor="middle" fontSize="9">Молка</text>
                <rect x="355" y="95" width="140" height="65" fill="#D2B48C" stroke="#333" strokeWidth="2"/>
                <text x="425" y="125" textAnchor="middle" fontSize="11">Рабочая</text>
                <text x="425" y="140" textAnchor="middle" fontSize="11">поверхность</text>
                <rect x="220" y="25" width="280" height="15" fill="#8B7355" opacity="0.6"/>
                <rect x="220" y="45" width="280" height="15" fill="#8B7355" opacity="0.6"/>
              </g>

              {/* ВИТРИНА ДЛЯ ДЕСЕРТОВ */}
              <g onClick={() => setSelectedZone('display')} className="cursor-pointer">
                <rect x="520" y="10" width="70" height="160" fill={zones.display.color} opacity="0.3" stroke="#333" strokeWidth="2"/>
                <text x="555" y="50" textAnchor="middle" fontSize="12" fontWeight="bold">ВИТРИНА</text>
                <text x="555" y="67" textAnchor="middle" fontSize="11">десертов</text>
                <text x="555" y="82" textAnchor="middle" fontSize="10">1.5 м²</text>
                <rect x="530" y="95" width="50" height="65" fill="#FFE4B5" stroke="#333" strokeWidth="2" rx="3"/>
                <line x1="535" y1="110" x2="575" y2="110" stroke="#333" strokeWidth="1"/>
                <line x1="535" y1="125" x2="575" y2="125" stroke="#333" strokeWidth="1"/>
                <line x1="535" y1="140" x2="575" y2="140" stroke="#333" strokeWidth="1"/>
                <circle cx="545" cy="102" r="3" fill="#FF69B4"/>
                <circle cx="555" cy="118" r="3" fill="#FFD700"/>
                <circle cx="565" cy="133" r="3" fill="#FF6347"/>
              </g>

              {/* ЗОНА ОБСЛУЖИВАНИЯ */}
              <g onClick={() => setSelectedZone('service')} className="cursor-pointer">
                <rect x="600" y="10" width="190" height="160" fill={zones.service.color} opacity="0.3" stroke="#333" strokeWidth="2"/>
                <text x="695" y="45" textAnchor="middle" fontSize="13" fontWeight="bold">ЗОНА</text>
                <text x="695" y="62" textAnchor="middle" fontSize="13" fontWeight="bold">ОБСЛУЖИВАНИЯ</text>
                <text x="695" y="78" textAnchor="middle" fontSize="11">6 м²</text>
                <rect x="615" y="110" width="160" height="50" fill="#CD853F" stroke="#333" strokeWidth="2"/>
                <text x="695" y="133" textAnchor="middle" fontSize="11">Стойка выдачи</text>
                <text x="695" y="148" textAnchor="middle" fontSize="10">+ Касса</text>
                <rect x="715" y="25" width="60" height="60" fill="#E8E8E8" stroke="#333" strokeWidth="2" rx="3"/>
                <text x="745" y="52" textAnchor="middle" fontSize="10">Холод.</text>
                <text x="745" y="64" textAnchor="middle" fontSize="9">молоко</text>
              </g>

              {/* ВХОДНАЯ ЗОНА */}
              <g onClick={() => setSelectedZone('entrance')} className="cursor-pointer">
                <rect x="600" y="180" width="190" height="140" fill={zones.entrance.color} opacity="0.3" stroke="#333" strokeWidth="2"/>
                <text x="695" y="235" textAnchor="middle" fontSize="14" fontWeight="bold">ВХОДНАЯ ЗОНА</text>
                <text x="695" y="255" textAnchor="middle" fontSize="12">6 м²</text>
                <g>
                  <rect x="670" y="290" width="80" height="25" fill="none" stroke="#333" strokeWidth="3"/>
                  <rect x="675" y="292" width="70" height="21" fill="#8B7355" stroke="#333" strokeWidth="2" rx="2"/>
                  <circle cx="690" cy="303" r="4" fill="#FFD700" stroke="#333" strokeWidth="1"/>
                  <text x="710" y="307" textAnchor="middle" fontSize="11" fontWeight="bold">ДВЕРЬ</text>
                  <g stroke="#FF0000" strokeWidth="3" fill="none">
                    <path d="M 695 270 L 695 285"/>
                    <path d="M 687 277 L 695 285 L 703 277"/>
                  </g>
                  <text x="695" y="268" textAnchor="middle" fontSize="10" fill="#FF0000" fontWeight="bold">ВХОД</text>
                </g>
              </g>

              {/* ГОСТЕВАЯ ЗОНА */}
              <g onClick={() => setSelectedZone('guest')} className="cursor-pointer">
                <rect x="10" y="260" width="580" height="230" fill={zones.guest.color} opacity="0.3" stroke="#333" strokeWidth="2"/>
                <text x="300" y="295" textAnchor="middle" fontSize="16" fontWeight="bold">ГОСТЕВАЯ ЗОНА</text>
                <text x="300" y="315" textAnchor="middle" fontSize="12">12 м² - 3 столика - 8-9 мест</text>

                <g>
                  <rect x="80" y="340" width="70" height="70" fill="#DEB887" stroke="#333" strokeWidth="2" rx="5"/>
                  <circle cx="65" cy="360" r="15" fill="#8B7355" stroke="#333" strokeWidth="1"/>
                  <circle cx="165" cy="360" r="15" fill="#8B7355" stroke="#333" strokeWidth="1"/>
                  <circle cx="65" cy="425" r="15" fill="#8B7355" stroke="#333" strokeWidth="1"/>
                  <text x="115" y="380" textAnchor="middle" fontSize="11" fontWeight="bold">Стол 1</text>
                  <text x="115" y="395" textAnchor="middle" fontSize="9">2-3 места</text>
                </g>

                <g>
                  <rect x="255" y="340" width="70" height="70" fill="#DEB887" stroke="#333" strokeWidth="2" rx="5"/>
                  <circle cx="240" cy="360" r="15" fill="#8B7355" stroke="#333" strokeWidth="1"/>
                  <circle cx="340" cy="360" r="15" fill="#8B7355" stroke="#333" strokeWidth="1"/>
                  <circle cx="240" cy="425" r="15" fill="#8B7355" stroke="#333" strokeWidth="1"/>
                  <text x="290" y="380" textAnchor="middle" fontSize="11" fontWeight="bold">Стол 2</text>
                  <text x="290" y="395" textAnchor="middle" fontSize="9">2-3 места</text>
                </g>

                <g>
                  <rect x="425" y="335" width="80" height="80" fill="#DEB887" stroke="#333" strokeWidth="2" rx="5"/>
                  <circle cx="410" cy="355" r="15" fill="#8B7355" stroke="#333" strokeWidth="1"/>
                  <circle cx="520" cy="355" r="15" fill="#8B7355" stroke="#333" strokeWidth="1"/>
                  <circle cx="410" cy="430" r="15" fill="#8B7355" stroke="#333" strokeWidth="1"/>
                  <circle cx="520" cy="430" r="15" fill="#8B7355" stroke="#333" strokeWidth="1"/>
                  <text x="465" y="378" textAnchor="middle" fontSize="11" fontWeight="bold">Стол 3</text>
                  <text x="465" y="393" textAnchor="middle" fontSize="9">3-4 места</text>
                </g>

                <line x1="10" y1="260" x2="200" y2="260" stroke="#000" strokeWidth="5"/>
                <text x="105" y="278" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#666">ГЛУХАЯ СТЕНА</text>
              </g>

              <text x="400" y="495" textAnchor="middle" fontSize="12" fontWeight="bold">8 метров</text>
              <text x="795" y="250" textAnchor="start" fontSize="12" fontWeight="bold" transform="rotate(90 795 250)">5 метров</text>
            </svg>

            <div className="mt-4 text-sm text-gray-600 space-y-2">
              <p className="font-semibold">Масштаб: 1 клетка = 50 см (при включенной сетке)</p>
              <p className="text-red-600 font-semibold">ВХОД: Справа внизу (красная стрелка и обозначение двери)</p>
              <p className="font-semibold">ГЛУХАЯ СТЕНА: Отделяет склад и мойку от гостевой зоны</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Info className="text-blue-600" size={20} />
              <h3 className="font-bold text-gray-800">Информация о зонах</h3>
            </div>

            {selectedZone ? (
              <div className="space-y-2">
                <div
                  className="w-full h-8 rounded mb-2"
                  style={{backgroundColor: zones[selectedZone].color, opacity: 0.6}}
                ></div>
                <h4 className="font-bold text-lg">{zones[selectedZone].name}</h4>
                <p className="text-sm text-gray-600 mb-2">{zones[selectedZone].description}</p>
                <p className="font-semibold">Площадь: {zones[selectedZone].area}</p>

                <div className="mt-3">
                  <p className="font-semibold text-sm mb-2">Оборудование:</p>
                  <ul className="text-sm space-y-1">
                    {zones[selectedZone].equipment.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedZone(null)}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-800"
                >
                  ← Назад к списку зон
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-3">Нажмите на зону на плане, чтобы увидеть детали</p>
                {Object.entries(zones).map(([key, zone]) => (
                  <div
                    key={key}
                    onClick={() => setSelectedZone(key)}
                    className="flex items-center gap-2 p-2 rounded hover:bg-white cursor-pointer transition"
                  >
                    <div
                      className="w-6 h-6 rounded"
                      style={{backgroundColor: zone.color, opacity: 0.6}}
                    ></div>
                    <div>
                      <p className="font-semibold text-sm">{zone.name}</p>
                      <p className="text-xs text-gray-500">{zone.area}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-gray-800 mb-3">Общие показатели</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Общая площадь:</span>
                <span className="font-bold">40 м²</span>
              </div>
              <div className="flex justify-between">
                <span>Рабочая зона:</span>
                <span className="font-bold">17.5 м² (43.75%)</span>
              </div>
              <div className="flex justify-between">
                <span>Гостевая зона:</span>
                <span className="font-bold">12 м² (30%)</span>
              </div>
              <div className="flex justify-between">
                <span>Подсобка/склад:</span>
                <span className="font-bold">5 м² (12.5%)</span>
              </div>
              <div className="flex justify-between">
                <span>Входная зона:</span>
                <span className="font-bold">6 м² (15%)</span>
              </div>
              <div className="border-t border-green-300 mt-2 pt-2">
                <div className="flex justify-between font-bold">
                  <span>Посадочных мест:</span>
                  <span>8-9 человек</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeShopLayout;
