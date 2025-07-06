// Импортируем NextResponse для удобного создания ответов
import { NextResponse } from 'next/server';

// Константа для базового URL, чтобы не повторяться
const BINANCE_API_URL = 'https://data-api.binance.vision/api/v3/';

// Определяем функцию для обработки GET-запросов
export async function GET(
	request: Request, // Входящий запрос от нашего фронтенда (RTK Query)
	{ params }: { params: { path: string[] } } // Объект с динамическими параметрами из URL
) {
	// --- ШАГ 1: Собрать путь ---
	// params.path — это массив, который мы получили из [...path].
	// Например, для URL /api/binance/klines, params.path будет ['klines'].
	// .join('/') превращает массив ['klines'] в строку 'klines'.
	const paramsCopy = await params;
	const path =  paramsCopy.path.join('/');

	// --- ШАГ 2: Собрать query-параметры ---
	// request.url содержит полный URL входящего запроса,
	// например 'http://localhost:3000/api/binance/klines?symbol=BTCUSDT&interval=1M'
	// new URL(request.url) создает объект URL, из которого легко достать параметры.
	const { searchParams } =  new URL(request.url); // Получаем объект URLSearchParams

	// --- ШАГ 3: Сформировать финальный URL для Бинанса ---
	// Собираем все вместе:
	// 1. Базовый URL Бинанса
	// 2. Путь, который мы проксируем
	// 3. Query-параметры
	// Получается: 'https://testnet.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1M'
	const url = `${BINANCE_API_URL}${path}?${searchParams.toString()}`;
	console.log('Final URL:', url);

	// --- ШАГ 4: Выполнить серверный запрос и обработать ответ ---
	try {
		// ВЫПОЛНЯЕТСЯ НА СЕРВЕРЕ! БРАУЗЕР НЕ УЧАСТВУЕТ -> НЕТ CORS!
		const res = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				// В будущем ты добавишь свой API-ключ сюда.
				// Он будет в безопасности, т.к. этот код никогда не попадет на клиент.
				// 'X-MBX-APIKEY': process.env.BINANCE_API_KEY,
			},
		});

		// Проверяем, ответил ли Бинанс успехом (коды 200-299)
		if (!res.ok) {
			// Если нет (например, 404, 401, 500), мы читаем тело ошибки от Бинанса...
			const errorData = await res.json();
			// ...и отправляем его нашему фронтенду с тем же статус-кодом.
			// Это очень полезно для отладки на фронте.
			return NextResponse.json(errorData, { status: res.status });
		}

		// Если все хорошо, парсим успешный ответ от Бинанса
		const data = await res.json();

		// --- ШАГ 5: Отправить данные нашему фронтенду ---
		// Отправляем данные, полученные от Бинанса, на наш фронтенд (в RTK Query).
		// NextResponse.json - это удобная обертка, которая создает Response
		// с Content-Type: application/json.
		return NextResponse.json(data);

	} catch (error) {
		// Если произошла сетевая ошибка (например, наш сервер не смог достучаться до Бинанса),
		// ловим ее и возвращаем стандартизированный ответ об ошибке.
		console.error('Proxy Error:', error);
		return NextResponse.json({ message: 'Error proxying to Binance API' }, { status: 500 });
	}
}