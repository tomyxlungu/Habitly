import { useState } from "react";
import { Text, View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Input,
    InputField,
} from "@/components/ui/input";

// This describes the props that AddHabit expects.
//
// `onAdd` is a function that:
// - receives a habit title as a string
// - doesn't return anything (void)
//
// HomeScreen provides this function.
type AddHabitProps = {
  onAdd: (title: string) => void;
};

export default function AddHabit({ onAdd }: AddHabitProps) {

  // `title` stores whatever the user is currently typing.
  //
  // Example:
  //
  // User types:
  // "Read for 20 minutes"
  //
  // title becomes:
  // "Read for 20 minutes"
  //
  // `setTitle` is used to change the value of title.
  const [title, setTitle] = useState("");


  // This function runs when the user presses
  // the "Add Habit" button.
  const handleAdd = () => {

    // Remove unnecessary spaces from the beginning
    // and end of the user's input.
    //
    // Example:
    //
    // "   Read   "
    //
    // becomes:
    //
    // "Read"
    const trimmedTitle = title.trim();


    // If the user didn't type anything,
    // stop here and don't create a habit.
    //
    // "" is considered false in JavaScript.
    if (!trimmedTitle) return;


    // Send the habit title back to HomeScreen.
    //
    // Remember:
    //
    // HomeScreen gave us:
    //
    // <AddHabit onAdd={addHabit} />
    //
    // So `onAdd` is actually the `addHabit`
    // function from HomeScreen.
    //
    // We're basically doing:
    //
    // addHabit("Read for 20 minutes")
    onAdd(trimmedTitle);


    // Clear the input after the habit has been added.
    //
    // This changes the input from:
    //
    // "Read for 20 minutes"
    //
    // back to:
    //
    // ""
    setTitle("");
  };


  return (
    // Card is a Gluestack UI component.
    //
    // It gives this section the card appearance
    // that matches the rest of the application.
    <Card className="mt-5 rounded-3xl p-5">

      {/* Title of the form */}
      <Text className="text-lg font-black text-typography-900">
        Add a new habit
      </Text>


      {/* Small description underneath the title */}
      <Text className="mt-1 text-sm text-typography-500">
        Build something worth repeating.
      </Text>


      {/* Input container */}
      <View className="mt-4">

        {/*
          Gluestack Input component.

          This is the outer container around the
          actual text field.
        */}
        <Input className="h-12 rounded-xl">

          {/*
            InputField is the actual text input.

            `value={title}` means the input displays
            whatever is currently stored in `title`.

            `onChangeText={setTitle}` means whenever
            the user types something, React calls:

            setTitle(newText)

            So:

            User types "R"
                ↓
            setTitle("R")
                ↓
            title = "R"

            User types "e"
                ↓
            setTitle("Re")
                ↓
            title = "Re"
          */}
          <InputField
            placeholder="e.g. Read for 20 minutes"
            value={title}
            onChangeText={setTitle}
          />

        </Input>
      </View>


      {/*
        Gluestack Button.

        When the user presses this button,
        `handleAdd` is executed.
      */}
      <Button
        className="mt-3 h-12 rounded-xl"
        onPress={handleAdd}
      >

        {/* Text displayed inside the button */}
        <ButtonText className="font-bold">
          Add Habit
        </ButtonText>

      </Button>

    </Card>
  );
}