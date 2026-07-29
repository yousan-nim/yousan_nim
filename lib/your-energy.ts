export type EnergyInput = {
  nickname: string;
  birthDate: string;
  birthTime?: string;
  birthPlace?: string;
  location: string;
  today: string;
  previousRuleId?: string;
};

export type EnergyReading = {
  ruleId: string;
  score: number;
  title: string;
  message: string;
  promptText: string;
  imagePrompt: string;
};

const RULES = [
  {
    id: "begin",
    title: "พลังแห่งการเริ่มต้น",
    advice: "วันนี้มีพลังของการเริ่มใหม่อยู่รอบตัวเธอ เรื่องที่เคยดูใหญ่เกินไปอาจเบาลงเมื่อแบ่งเป็นก้าวเล็ก ๆ",
    action: "เลือกหนึ่งอย่างที่ใช้เวลาไม่เกินสิบห้านาทีแล้วลงมือทันที แค่เริ่มก็ถือว่าเธอชนะความลังเลไปแล้ว",
  },
  {
    id: "clarity",
    title: "พลังแห่งความชัดเจน",
    advice: "ความคิดหลายอย่างอาจกำลังวิ่งพร้อมกัน แต่คำตอบที่เธอต้องการไม่ได้อยู่ไกลอย่างที่รู้สึก",
    action: "เขียนสิ่งสำคัญที่สุดเพียงหนึ่งข้อ แล้วให้เวลาตัวเองอยู่กับมันโดยไม่ต้องรีบตัดสินใจ",
  },
  {
    id: "connection",
    title: "พลังแห่งการเชื่อมโยง",
    advice: "หัวใจของเธอจะได้รับพลังจากบทสนทนาที่จริงใจ บางครั้งการได้พูดหรือรับฟังก็ช่วยคลายสิ่งที่แบกไว้",
    action: "ลองทักหาใครสักคนที่ทำให้รู้สึกปลอดภัย ความอบอุ่นเล็ก ๆ วันนี้อาจมีความหมายกว่าที่คิด",
  },
  {
    id: "rest",
    title: "พลังแห่งการพักใจ",
    advice: "ร่างกายและหัวใจกำลังขอพื้นที่ว่างจากความเร่งรีบ การช้าลงไม่ได้แปลว่าเธอกำลังตามใครไม่ทัน",
    action: "วางหน้าจอสักครู่ หายใจลึก ๆ และให้ตัวเองพักโดยไม่ต้องหาเหตุผล เพราะการพักก็คือความก้าวหน้า",
  },
  {
    id: "courage",
    title: "พลังแห่งความกล้า",
    advice: "มีบางสิ่งในใจที่เธอรู้อยู่แล้วว่าควรเลือก วันนี้เป็นจังหวะดีที่จะเชื่อเสียงของตัวเองให้มากขึ้น",
    action: "พูดความต้องการอย่างอ่อนโยนแต่ชัดเจน เธอไม่จำเป็นต้องลดคุณค่าตัวเองเพื่อให้ทุกคนพอใจ",
  },
  {
    id: "kindness",
    title: "พลังแห่งความอ่อนโยน",
    advice: "วันนี้หัวใจอาจไวต่อคำพูดและบรรยากาศมากเป็นพิเศษ จึงควรเลือกอยู่ใกล้สิ่งที่ทำให้รู้สึกเบาสบาย",
    action: "พูดกับตัวเองเหมือนที่เธอพูดกับเพื่อนรักหนึ่งประโยค ความอ่อนโยนไม่ใช่ความอ่อนแอเลย",
  },
  {
    id: "focus",
    title: "พลังแห่งสมาธิ",
    advice: "พลังของเธอจะเด่นที่สุดเมื่อไม่กระจายไปหลายทาง วันนี้ไม่จำเป็นต้องทำทุกอย่างให้เสร็จพร้อมกัน",
    action: "ปิดสิ่งรบกวนแล้วตั้งใจทำเรื่องเดียวเป็นเวลาสั้น ๆ คุณภาพของช่วงเวลานั้นจะพาเธอไปไกล",
  },
  {
    id: "release",
    title: "พลังแห่งการปล่อยวาง",
    advice: "บางเรื่องไม่ได้ต้องการคำตอบเพิ่ม แต่อาจต้องการพื้นที่ให้มันค่อย ๆ จางลงจากใจของเธอ",
    action: "เลือกวางหนึ่งความคาดหวังที่ควบคุมไม่ได้ แล้วนำพลังกลับมาดูแลสิ่งที่อยู่ตรงหน้า",
  },
  {
    id: "joy",
    title: "พลังแห่งความสุขเล็ก ๆ",
    advice: "โชคดีของวันนี้อาจไม่ได้มาในรูปเรื่องใหญ่ แต่อยู่ในรายละเอียดธรรมดาที่ทำให้เธอยิ้มได้",
    action: "ให้รางวัลตัวเองด้วยสิ่งเล็ก ๆ ที่ชอบ แล้วเก็บช่วงเวลานั้นไว้โดยไม่ต้องรู้สึกผิด",
  },
  {
    id: "trust",
    title: "พลังแห่งความไว้วางใจ",
    advice: "แม้ภาพข้างหน้ายังไม่ชัด แต่สิ่งที่เธอผ่านมาได้กำลังยืนยันว่าเธอมีความสามารถพอสำหรับก้าวต่อไป",
    action: "เลือกตัดสินใจจากข้อมูลที่มี แล้วอนุญาตให้ตัวเองปรับเส้นทางภายหลังได้ ไม่มีใครต้องรู้ทุกคำตอบตั้งแต่แรก",
  },
] as const;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isEnergyInput(value: unknown): value is EnergyInput {
  if (!value || typeof value !== "object") return false;
  const input = value as Record<string, unknown>;
  return (
    typeof input.nickname === "string" &&
    input.nickname.trim().length > 0 &&
    input.nickname.length <= 50 &&
    typeof input.birthDate === "string" &&
    DATE_PATTERN.test(input.birthDate) &&
    typeof input.location === "string" &&
    input.location.trim().length > 0 &&
    input.location.length <= 100 &&
    typeof input.today === "string" &&
    DATE_PATTERN.test(input.today) &&
    (input.birthTime === undefined ||
      (typeof input.birthTime === "string" && input.birthTime.length <= 5)) &&
    (input.birthPlace === undefined ||
      (typeof input.birthPlace === "string" && input.birthPlace.length <= 100)) &&
    (input.previousRuleId === undefined ||
      (typeof input.previousRuleId === "string" &&
        input.previousRuleId.length <= 20))
  );
}

export function createEnergyReading(input: EnergyInput): EnergyReading {
  const seed = [...`${input.birthDate}|${input.birthTime}|${input.birthPlace}|${input.location}|${input.today}`]
    .reduce((total, character) => total + character.charCodeAt(0), 0);
  const initialIndex = seed % RULES.length;
  const previousIndex = RULES.findIndex(
    (rule) => rule.id === input.previousRuleId
  );
  const rule =
    RULES[previousIndex >= 0 ? (previousIndex + 1) % RULES.length : initialIndex];
  const nickname = input.nickname.trim();
  const score = 62 + (seed % 34);
  const message = `${nickname}, ${rule.advice}\n\n${rule.action}\n\nจำไว้นะว่าเธอไม่จำเป็นต้องสมบูรณ์แบบ แค่ซื่อสัตย์กับความรู้สึกและค่อย ๆ ไปในจังหวะของตัวเองก็เพียงพอแล้ว`;
  const imagePrompt = [
    `แนวคิด: สร้างภาพให้กำลังใจสำหรับ ${nickname} ในธีม “${rule.title}” ถ่ายทอดความรู้สึกอบอุ่น ปลอดภัย และมีความหวัง เชื่อมโยงกับข้อความว่า ${rule.advice}`,
    `ฉากและองค์ประกอบ: หญิงสาวกำลังหยุดพักท่ามกลางสวนดอกไม้ยามเช้า มองแสงที่ลอดผ่านกลีบเมฆด้วยสีหน้าสงบ จัดองค์ประกอบแนวตั้ง 4:5 มีพื้นที่ว่างด้านบนสำหรับข้อความ รายละเอียดนุ่มนวลและเป็นธรรมชาติ`,
    `แสงสีและสไตล์: ภาพประกอบกึ่งสมจริงโทนชมพูพีช ครีม และทองอ่อน แสงอาทิตย์ฟุ้งแบบ cinematic glow มีประกายเล็ก ๆ และกลีบดอกไม้ลอยบางเบา อารมณ์ละมุน ไม่เศร้า ไม่มืด และไม่ดูเป็นภาพสต็อก`,
    `ข้อความบนภาพ: “${rule.action}” ใช้ตัวอักษรไทยอ่านง่าย สีเข้มตัดกับพื้นหลัง จัดวางอย่างประณีต ตรวจการสะกดให้ถูกต้อง ภาพคมชัด ไม่มีโลโก้ ไม่มีลายน้ำ ไม่มีข้อความอื่น และไม่บิดเบือนมือหรือใบหน้า`,
  ].join("\n");

  return {
    ruleId: rule.id,
    score,
    title: rule.title,
    message,
    promptText: `ข้อความให้กำลังใจประจำวันที่ ${input.today}: ${message}`,
    imagePrompt,
  };
}
