import { useState } from "react";
import { Text, View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Input,
    InputField,
} from "@/components/ui/input";

type AddHabitProps = {
  onAdd: (title: string) => void;
};

export default function AddHabit({ onAdd }: AddHabitProps) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onAdd(trimmedTitle);
    setTitle("");
  };

  return (
    <Card className="mt-5 rounded-3xl p-5">
      <Text className="text-lg font-black text-typography-900">
        Add a new habit
      </Text>

      <Text className="mt-1 text-sm text-typography-500">
        Build something worth repeating.
      </Text>

      <View className="mt-4">
        <Input className="h-12 rounded-xl">
          <InputField
            placeholder="e.g. Read for 20 minutes"
            value={title}
            onChangeText={setTitle}
          />
        </Input>
      </View>

      <Button
        className="mt-3 h-12 rounded-xl"
        onPress={handleAdd}
      >
        <ButtonText className="font-bold">
          Add Habit
        </ButtonText>
      </Button>
    </Card>
  );
}