import assert from "node:assert/strict";
import test from "node:test";
import {
  createEnergyReading,
  isEnergyInput,
  type EnergyInput,
} from "./your-energy.ts";

const input: EnergyInput = {
  nickname: "มิน",
  birthDate: "1998-05-12",
  birthPlace: "Bangkok",
  location: "13.756,100.502",
  today: "2026-07-29",
};

test("returns a stable daily reading and avoids the previous rule", () => {
  assert.deepEqual(createEnergyReading(input), createEnergyReading(input));
  const first = createEnergyReading(input);
  const next = createEnergyReading({ ...input, previousRuleId: first.ruleId });
  assert.notEqual(next.ruleId, first.ruleId);
  assert.match(first.message, /^มิน,/);
  assert.equal(first.imagePrompt.split("\n").length, 4);
});

test("rejects incomplete input", () => {
  assert.equal(isEnergyInput({ nickname: "มิน" }), false);
});
