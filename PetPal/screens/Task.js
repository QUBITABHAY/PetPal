import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { TASKS_API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TasksScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const response = await fetch(TASKS_API_URL, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data.tasks || data);
      } catch (err) {
        setError(err.message || "Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const renderTaskItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.statusBar} />
      <View style={styles.cardContent}>
        <View style={styles.taskHeaderRow}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Image source={{ uri: item.petPhoto }} style={styles.avatar} />
        </View>

        <Text style={styles.petText}>
          {item.petName} • {item.species}
        </Text>

        <View style={styles.timeRow}>
          <Text style={styles.dateText}>{item.dueDate}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.timeText}>{item.dueTime}</Text>
        </View>

        {item.notes ? (
          <Text style={styles.notesText} numberOfLines={2}>
            {item.notes}
          </Text>
        ) : null}

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Mark Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming Tasks</Text>
        <Text style={styles.subtitle}>
          Stay on top of vaccinations, walks & care.
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#4F46E5"
          style={{ marginTop: 40 }}
        />
      ) : error ? (
        <Text style={{ color: "red", marginTop: 40, textAlign: "center" }}>
          {error}
        </Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderTaskItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    overflow: "hidden",
  },
  statusBar: {
    width: 5,
    backgroundColor: "#4F46E5",
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  taskHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginRight: 8,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
  },
  petText: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 4,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4F46E5",
  },
  dot: {
    marginHorizontal: 4,
    fontSize: 12,
    color: "#9CA3AF",
  },
  timeText: {
    fontSize: 12,
    color: "#6B7280",
  },
  notesText: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 6,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 8,
  },
  primaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#4F46E5",
  },
  primaryButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#111827",
  },
});
